from storages.backends.s3boto3 import S3Boto3Storage

from django_app.settings import YANDEX_CLIENT_DOCS_BUCKET_NAME


class YandexS3Storage(S3Boto3Storage):
    bucket_name = YANDEX_CLIENT_DOCS_BUCKET_NAME
    file_overwrite = False

