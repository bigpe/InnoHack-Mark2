import argparse
import datetime

import tensorflow as tf
import matplotlib.pyplot as plt
import os
from pathlib import Path

from hashlib import md5

from interpolate import model_progression


def generate(model_prog=False, count=1):
    for _ in range(count):
        main(model_prog)


def main(model_prog=False, display=6):
    image_time_hash = md5(datetime.datetime.now().ctime().encode('utf-8')).hexdigest()

    filepath = Path(os.getcwd())
    models_path = filepath.joinpath('models')

    generator_path = models_path.joinpath('COVID_CT_GAN_Generator.h5')
    discriminator_path = models_path.joinpath("COVID_CT_GAN_Discriminator.h5")
    gan_path = models_path.joinpath("COVID_CT_GAN_GAN.h5")

    generator = tf.keras.models.load_model(generator_path)
    discriminator = tf.keras.models.load_model(discriminator_path)
    gan = tf.keras.models.load_model(gan_path)

    noise = tf.random.normal([1, 100])

    if model_prog:
        res = base_model_progression(generator)
        plt.figure(figsize=(16.8, 18.4))
        for i in range(display):
            plt.subplot(display, display, 1 + i)
            plt.axis('off')
            plt.title(str(i))
            plt.imshow(res[i, :, :, 0], cmap='gray')
        plt.savefig(f'{image_time_hash}.png')
    else:
        generated_image0 = generator.predict(noise)
        plt.figure()
        plt.imshow(generated_image0[0, :, :, 0], cmap='gray')
        plt.savefig(f'{image_time_hash}.png')


def base_model_progression(generator, start_noise=tf.random.normal([1, 100]), end_noise=tf.random.normal([1, 100])):
    res = model_progression(generator, start=start_noise, end=end_noise, steps=6, display=6)
    return res


def _parse_args():
    """
    Command-line arguments to the system. --model switches between the main modes you'll need to use
    :return: the parsed args bundle
    """
    parser = argparse.ArgumentParser(description='GAN_generation_COVID19.py')

    parser.add_argument('--generation_type', type=str, default='SINGLE',
                        help='what type of generation to use (SINGLE, PROGRESSIVE)')

    args = parser.parse_args()
    return args


if __name__ == "__main__":
    args = _parse_args()
    print(args)

    if args.generation_type == "PROGRESSIVE":
        generate(model_prog=True)
    else:
        generate(model_prog=False)
