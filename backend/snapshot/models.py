from __future__ import annotations
from typing import Union

import requests
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Manager
from colorfield.fields import ColorField
from django.db.models.signals import pre_save
from django.dispatch import receiver

from bootstrap.utils import BootstrapMixin
from snapshot.utils import dicom_to_image

User = get_user_model()


class Palette(models.TextChoices):
    white = '#FFFFFF', 'White'
    black = '#000000', 'Black'
    purple = '#8B21DF', 'Purple'
    orange = '#FBA76F', 'Orange'
    red = '#CA3333', 'Red'
    blue = '#1300EA', 'Blue'


class TypeCollection(models.Model, BootstrapMixin):
    name = models.CharField(max_length=50)
    color = ColorField(samples=Palette.choices)
    type_snapshot_collections: Union[SnapshotCollection, Manager]


class SnapshotCollection(models.Model, BootstrapMixin):
    class Types(models.TextChoices):
        manual = 'manual', 'Created manually'
        generated = 'generated', 'Generated'

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50, choices=Types.choices, default=Types.manual)
    generate_rules = models.JSONField(null=True, blank=True)
    create_rules = models.JSONField(null=True, blank=True)
    markup = models.FileField(null=True, blank=True, upload_to='markup')
    color = ColorField(samples=Palette.choices)
    created_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, models.CASCADE, related_name='user_snapshot_collections')
    type_collection = models.ForeignKey(TypeCollection, models.CASCADE, related_name='type_snapshot_collections')
    snapshots: Union[Snapshot, Manager]


class Snapshot(models.Model, BootstrapMixin):
    file = models.FileField(upload_to='snapshot_file')
    preview = models.FileField(upload_to='snapshot_preview', blank=True, null=True)
    is_marked = models.BooleanField(default=False)
    snapshot_collection = models.ForeignKey(SnapshotCollection, models.CASCADE, related_name='snapshots')


@receiver(signal=pre_save, sender=Snapshot)
def snapshot_pre_save(instance: Snapshot, *args, **kwargs):
    ...
