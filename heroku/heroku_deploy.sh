#!/bin/bash

source .env

git push heroku_test master
heroku ps:restart --app $HEROKU_TEST_APP_NAME
