from django.urls import path

from .views import (SignInView, SignView, SignOutView, PasswordChangeView, SessionStorageView)

urlpatterns = [
    path('sign/', SignView.as_view()),
    path('sign/in/', SignInView.as_view()),
    path('sign/out/', SignOutView.as_view()),
    path('password/change/', PasswordChangeView.as_view()),
    path('session/storage/', SessionStorageView.as_view()),
]
