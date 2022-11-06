#!/bin/bash

bash ./backend/runner/runner.sh &

# Heroku or run without docker
echo "Server started"
touch /tmp/app-initialized