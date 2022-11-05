#!/bin/bash

source .env
source ../.env
source ../backend/.env

cp Procfile ..
cp .buildpacks ..
echo $RUNTIME_VERSION > ../backend/runtime.txt

./create_requirements.sh
