#############################
Welcome to generating system!
#############################

This generative system supports generating either single images, or a series of 6 images with progressive COVID-19 on it.
Solution is based on https://github.com/brendon-ng/COVID-19-Affected-Lung-CT-Image-Generative-Network Demo. 

For the purpose of demostration you can use two commands in a command line:

# Generates a PNG with a sequence of lung images with COVID-19 progression on it
1. python GAN\ generation\ COVID19.py --generation_type PROGRESSIVE

# Generates a single PNG image with lungs with COVID-19
2. python GAN\ generation\ COVID19.py --generation_type SINGLE

It will produce a single image by default.

The solutions may suffer from the small dataset which is used for the demo purposes. The solution must be retrained for the production on more data.

######################
The Dark Force Team <3
######################