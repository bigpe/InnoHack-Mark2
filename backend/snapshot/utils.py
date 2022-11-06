import pydicom
import numpy as np
import png
import shutil


def dicom_to_image(dicom_path: str, image_path: str):
    dicom = pydicom.read_file(dicom_path)
    shape = dicom.pixel_array.shape

    image_2d = dicom.pixel_array.astype(float)
    image_2d_scaled = (np.maximum(image_2d, 0) / image_2d.max()) * 255.0
    image_2d_scaled = np.uint8(image_2d_scaled)

    with open(image_path, 'wb') as png_file:
        w = png.Writer(shape[1], shape[0], greyscale=True)
        w.write(png_file, image_2d_scaled)


def extract_archive(archive_path, extract_to):
    shutil.unpack_archive(archive_path, extract_to)
