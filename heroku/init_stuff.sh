#!/bin/bash

cp Procfile ..
cp .buildpacks ..
echo $RUNTIME_VERSION > ../backend/runtime.txt

./create_requirements.sh
