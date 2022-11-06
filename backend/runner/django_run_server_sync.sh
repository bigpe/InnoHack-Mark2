#!/bin/bash

touch /tmp/app-initialized

if [ "$DEBUG" = "1" ]; then \
    python3 manage.py runserver "0.0.0.0:${BACKEND_PORT:-8000}"
else \
  python3 manage.py runserver "0.0.0.0:${BACKEND_PORT:-8000}"
fi