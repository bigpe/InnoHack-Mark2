#!/bin/bash

cd ../backend || exit
poetry export --without-hashes > ../requirements.txt
cd - || exit

git add ../requirements.txt