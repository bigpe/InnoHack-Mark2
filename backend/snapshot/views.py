from django.contrib.auth import get_user_model, authenticate, login, logout, update_session_auth_hash
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TypeCollection, SnapshotCollection, Snapshot
from .serializers import TypeCollectionSerializer, SnapshotCollectionSerializer, SnapshotSerializer
from django_app.auth import CsrfExemptSessionAuthentication

User = get_user_model()


class TypeCollectionListView(ListAPIView):
    """
    Type Collections

    Get snapshot folders grouped by label
    """
    queryset = TypeCollection.objects.all()
    serializer_class = TypeCollectionSerializer


class SnapshotCollectionListView(ListAPIView):
    """
    Snapshot Collections

    Get snapshot folders grouped by snapshot (with many snapshots in there)
    """
    queryset = SnapshotCollection.objects.all()
    serializer_class = SnapshotCollectionSerializer


class SnapshotRetrieveView(RetrieveAPIView):
    """
    Snapshot

    Get information about single snapshot
    """
    queryset = Snapshot.objects.all()
    serializer_class = SnapshotSerializer
