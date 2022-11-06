from __future__ import annotations

import glob
import os
from pathlib import Path
from typing import Union

import requests
from django.contrib.auth import get_user_model
from django.core.files import File
from django.db import models
from django.db.models import Manager
from colorfield.fields import ColorField
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from bootstrap.utils import BootstrapMixin, BootstrapGeneric
from snapshot.utils import dicom_to_image, extract_archive

User = get_user_model()


class Palette(models.TextChoices):
    white = '#FFFFFF', 'White'
    black = '#000000', 'Black'
    purple = '#8B21DF', 'Purple'
    orange = '#FBA76F', 'Orange'
    red = '#CA3333', 'Red'
    blue = '#1300EA', 'Blue'


class TypeCollection(models.Model):
    name = models.CharField(max_length=10)
    color = ColorField(samples=Palette.choices)
    snapshot_collections: Union[SnapshotCollection, Manager]

    class Bootstrap(BootstrapGeneric):
        color = Palette.choices


class SnapshotCollection(models.Model):
    class Types(models.TextChoices):
        manual = 'manual', 'Created manually'
        generated = 'generated', 'Generated'

    name = models.CharField(max_length=10)
    type = models.CharField(max_length=50, choices=Types.choices, default=Types.manual)
    archive = models.FileField()
    generate_rules = models.JSONField(null=True, blank=True)
    create_rules = models.JSONField(null=True, blank=True)
    markup = models.FileField(null=True, blank=True, upload_to='markup')
    color = ColorField(samples=Palette.choices)
    created_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, models.CASCADE, related_name='user_snapshot_collections')
    type_collection = models.ForeignKey(TypeCollection, models.CASCADE, related_name='snapshot_collections')
    snapshots: Union[Snapshot, Manager]

    class Bootstrap(BootstrapGeneric):
        color = Palette.choices


@receiver(signal=post_save, sender=SnapshotCollection)
def snapshot_post_save(instance: SnapshotCollection, *args, **kwargs):
    archive_dir = 'archive_extract'
    Path(archive_dir).mkdir(exist_ok=True)

    for dcm in Path(archive_dir).glob('*dcm'):
        dcm.unlink(missing_ok=True)

    open('archive.zip', 'wb').write(requests.get(instance.archive.url).content)
    extract_archive('archive.zip', archive_dir)

    for dcm in Path(archive_dir).glob('*dcm'):
        Snapshot.objects.create(
            file=File(open(dcm, 'rb'), name='file.dcm'),
            snapshot_collection=instance
        )


class Snapshot(models.Model, BootstrapMixin):
    file = models.FileField(upload_to='snapshot_file')
    preview = models.FileField(upload_to='snapshot_preview', blank=True, null=True)
    is_marked = models.BooleanField(default=False)
    snapshot_collection = models.ForeignKey(SnapshotCollection, models.CASCADE, related_name='snapshots')


@receiver(signal=post_save, sender=Snapshot)
def snapshot_post_save(instance: Snapshot, created, *args, **kwargs):
    if created:
        open('test_image.png', 'wb').write(requests.get(instance.file.url).content)
        dicom_to_image('test_image.png', 'test_image_preview.png')
        instance.preview = File(open('test_image_preview.png', 'rb'), name='preview.png')
        instance.save()
