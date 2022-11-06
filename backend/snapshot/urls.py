from django.urls import path

from .views import (TypeCollectionListView, SnapshotCollectionListView, SnapshotCollectionCreateView, SnapshotRetrieveView)

urlpatterns = [
    path('type/', TypeCollectionListView.as_view()),
    path('type/<int:pk>/', SnapshotCollectionListView.as_view()),
    path('snapshot/', SnapshotCollectionCreateView.as_view()),
    path('snapshot/<int:pk>/', SnapshotRetrieveView.as_view()),
]
