#!/bin/bash

source .env
source ../.env
source ../backend/.env

cat ../.env ../backend/.env .env | awk '!/HEROKU_*/' > .env.tmp

./init_stuff.sh

heroku buildpacks:clear --app "$HEROKU_TEST_APP_NAME"
heroku buildpacks:add https://github.com/SectorLabs/heroku-buildpack-subdir.git --app "$HEROKU_TEST_APP_NAME"
heroku plugins:install heroku-config

heroku config:push --file=.env.tmp -o --app "$HEROKU_TEST_APP_NAME"
rm .env.tmp

heroku git:remote -a "$HEROKU_TEST_APP_NAME" --remote heroku_test
