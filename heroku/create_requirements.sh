#!/bin/bash

cd ../backend || exit
poetry export --without-hashes > requirements.txt
git add requirements.txt
cd - || exit
