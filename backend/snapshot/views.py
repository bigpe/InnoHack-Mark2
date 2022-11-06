from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated

from .models import TypeCollection, SnapshotCollection, Snapshot
from .serializers import TypeCollectionSerializer, SnapshotCollectionListSerializer, SnapshotSerializer, \
    SnapshotCollectionCreateSerializer
from django_app.auth import CsrfExemptSessionAuthentication

User = get_user_model()


class TypeCollectionListView(ListAPIView):
    """
    Type Collections

    Get snapshot folders grouped by label
    """
    queryset = TypeCollection.objects.all()
    serializer_class = TypeCollectionSerializer


class SnapshotCollectionListView(RetrieveAPIView):
    """
    Snapshot Collections

    Get snapshot folders grouped by snapshot (with many snapshots in there)
    """
    queryset = SnapshotCollection.objects.all()
    serializer_class = SnapshotCollectionListSerializer


class SnapshotCollectionCreateView(CreateAPIView):
    """
    Snapshot Collection

    Create snapshot folder
    """
    queryset = SnapshotCollection.objects.all()
    serializer_class = SnapshotCollectionCreateSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]


class SnapshotRetrieveView(RetrieveAPIView):
    """
    Snapshot

    Get information about single snapshot
    """
    queryset = Snapshot.objects.all()
    serializer_class = SnapshotSerializer
