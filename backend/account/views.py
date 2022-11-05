from django.contrib.auth import get_user_model, authenticate, login, logout, update_session_auth_hash
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserAuthSerializer, ChangePasswordSerializer, UserSerializer, SessionStorageSerializer, \
    UserCreateSerializer
from django_app.auth import CsrfExemptSessionAuthentication

User = get_user_model()


class SignView(APIView):
    """
    Check auth

    Check auth
    """
    authentication_classes = [CsrfExemptSessionAuthentication]

    def get(self, request, *args, **kwargs):
        if not self.request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        self.request.session['user_id'] = self.request.user.id
        return Response(UserSerializer(self.request.user).data, status=status.HTTP_202_ACCEPTED)


class SignInView(APIView):
    """
    Login at account

    Login at account (if not exist, create new one)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]

    @swagger_auto_schema(request_body=UserAuthSerializer, responses={201: UserSerializer()})
    def post(self, request, *args, **kwargs):
        user_not_exist = not User.objects.filter(username=request.data.get('username')).first()
        if user_not_exist:
            UserCreateSerializer().create(dict(request.data))
        user = authenticate(request, **request.data)
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        login(request, user)
        return Response(UserSerializer(user).data, status=status.HTTP_202_ACCEPTED)


class SignOutView(APIView):
    """
    Logout at existed account

    Logout at existed account
    """
    authentication_classes = [CsrfExemptSessionAuthentication]

    def get(self, request, *args, **kwargs):
        logout(self.request)
        return Response(status=status.HTTP_200_OK)


class PasswordChangeView(UpdateAPIView):
    """
    Change password

    Change password from profile page to authed user
    """
    authentication_classes = [CsrfExemptSessionAuthentication]
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['patch']

    def perform_update(self, serializer):
        serializer.save()
        update_session_auth_hash(self.request, self.request.user)


class SessionStorageView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]

    @swagger_auto_schema(request_body=SessionStorageSerializer)
    def post(self, request):
        """
        Session storage

        Storage any data to guest user by session id
        """
        self.request.session.update(self.request.data)
        return HttpResponse(status=status.HTTP_201_CREATED)
