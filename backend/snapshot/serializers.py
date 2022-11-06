from django.contrib.auth import get_user_model
from rest_framework import serializers

from snapshot.models import TypeCollection, SnapshotCollection, Snapshot

User = get_user_model()


class TypeCollectionSerializer(serializers.ModelSerializer):
    snapshot_count = serializers.SerializerMethodField()
    marked_snapshot_count = serializers.SerializerMethodField()

    @staticmethod
    def get_snapshot_count(instance: TypeCollection):
        count = 0
        snapshot_collections = instance.type_snapshot_collections.all()
        for snapshot_collection in snapshot_collections:
            snapshot_collection: SnapshotCollection
            count += snapshot_collection.snapshots.all().count()
        return count

    @staticmethod
    def get_marked_snapshot_count(instance: TypeCollection):
        count = 0
        snapshot_collections = instance.type_snapshot_collections.all()
        for snapshot_collection in snapshot_collections:
            snapshot_collection: SnapshotCollection
            count += snapshot_collection.snapshots.filter(snapshots__is_marked=True).all().count()
        return count

    class Meta:
        model = TypeCollection
        fields = '__all__'


class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snapshot
        fields = '__all__'


class SnapshotCollectionListSerializer(serializers.ModelSerializer):
    snapshots = SnapshotSerializer(many=True)
    snapshot_count = serializers.SerializerMethodField()
    marked_snapshot_count = serializers.SerializerMethodField()

    @staticmethod
    def get_snapshot_count(instance: SnapshotCollection):
        return instance.snapshots.all().count()

    @staticmethod
    def get_marked_snapshot_count(instance: SnapshotCollection):
        return instance.snapshots.filter(snapshots__is_marked=True).all().count()

    class Meta:
        model = SnapshotCollection
        fields = '__all__'
