from django.urls import path, include
from .schema import urlpatterns as patterns

urlpatterns = [
    path('account/', include('account.urls')),
    path('collection/', include('snapshot.urls')),
] + patterns
