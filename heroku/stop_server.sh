#!/bin/bash

source .env

lsof -i :"${BACKEND_PORT:-8000}" | tail -n +2 | awk '{print $2}' | xargs kill &> /dev/null
