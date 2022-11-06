import os
from os import environ

from ftp_downloader import FTPDownloader

from dotenv import load_dotenv

load_dotenv()

if __name__ == '__main__':
    ftp_client = FTPDownloader(
        environ.get('FTP_HOST'),
        environ.get('FTP_PORT'),
        environ.get('FTP_USER'),
        environ.get('FTP_PASSWORD')
    )
    ftp_client.download_dir(
        download_from_dir=os.getenv('FTP_DOWNLOAD_MODELS_PATH'),
        upload_to_dir='models',
        exclude_ext=['.zip'],
        with_root_path=False
    )
