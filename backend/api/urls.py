from django.urls import path, include
from.schema import urlpatterns as patterns

urlpatterns = [
    path('account/', include('account.urls')),
] + patterns
