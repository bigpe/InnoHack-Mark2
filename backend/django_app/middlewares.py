from asgiref.sync import sync_to_async
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import AnonymousUser

User = get_user_model()


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        scope['user'] = AnonymousUser()
        if b'authorization' in headers:
            try:
                token_name, token_key = headers[b'authorization'].decode().split()
                if token_name == 'Token':
                    scope['user'] = await sync_to_async(lambda: Token.objects.get(key=token_key).user)()
            except Token.DoesNotExist:
                scope['user'] = AnonymousUser()
        return await self.inner(scope, receive, send)
