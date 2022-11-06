#!/bin/bash

bash ./backend/runner/runner.sh &

sleep 40

# Heroku or run without docker
echo "Server started"
touch /tmp/app-initialized