#!/bin/bash
cd backend
python manage.py migrate
gunicorn myserver.wsgi --bind 0.0.0.0:$PORT