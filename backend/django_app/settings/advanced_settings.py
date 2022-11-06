import django_on_heroku
from django.core.management.utils import get_random_secret_key
from dotenv import load_dotenv

from .settings import *
from .utils import *

if not load_option_from_env('DISABLE_LOAD_DOT_ENV', False, transform=numeric_to_bool):
    load_dotenv(BASE_DIR.parent.parent / '.env')
    load_dotenv()

INSTALLED_APPS += [
    'drf_yasg',
    'rest_framework',
    'colorfield',
    'storages',
    'api',
    'snapshot',
    'bootstrap',
]

if load_option_from_env('LOCAL_DATABASE', default=False, default_is_empty=True):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
            'USER': load_option_from_env('DB_USER', 'user', default_is_empty=True),
            'PASSWORD': load_option_from_env('DB_PASSWORD', 'password', default_is_empty=True),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': load_option_from_env('DJANGO_DB_ENGINE', 'django.db.backends.sqlite3', default_is_empty=True),
            'NAME': load_option_from_env('DB_NAME', BASE_DIR / 'db.sqlite3', default_is_empty=True),
            'USER': load_option_from_env('DB_USER', 'user', default_is_empty=True),
            'PASSWORD': load_option_from_env('DB_PASSWORD', 'password', default_is_empty=True),
            'HOST': load_option_from_env('DJANGO_DB_HOST', 'localhost', default_is_empty=True),
            'PORT': load_option_from_env('DJANGO_DB_PORT', '5432', default_is_empty=True),
        }
    }

django_on_heroku.settings(locals())

STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = 'api/media/'

STATIC_URL = 'api/static/'
STATIC_ROOT = BASE_DIR / 'static'

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'

SECRET_KEY = load_option_from_env('DJANGO_SECRET_KEY', get_random_secret_key(), default_is_empty=True)
DEBUG = load_option_from_env('DEBUG', True, transform=numeric_to_bool)
ALLOWED_HOSTS = load_option_from_env('DJANGO_ALLOWED_HOSTS', '*', transform=split_by_coma)
PROJECT_NAME = load_option_from_env('PROJECT_NAME', '')
PROJECT_DESCRIPTION = load_option_from_env('PROJECT_DESCRIPTION', '')
API_INFO = {
    'title': f'{PROJECT_NAME} API',
    'description': f'API for {PROJECT_DESCRIPTION}',
}

DEFAULT_FILE_STORAGE = 'django_app.storages.yandex.YandexS3Storage'
YANDEX_CLIENT_DOCS_BUCKET_NAME = os.getenv('YANDEX_CLIENT_DOCS_BUCKET_NAME')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_S3_ENDPOINT_URL = 'https://storage.yandexcloud.net'
AWS_S3_REGION_NAME = 'storage'
