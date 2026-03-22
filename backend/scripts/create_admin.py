import os
import sys

# Ensure the project root (backend/) is on sys.path so Django can import myserver.settings
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myserver.settings')

import django

django.setup()

from webapp.models import User

username = 'admin'
password = 'Admin123!'
email = 'admin@example.com'

user = User.objects.filter(username=username).first()

if not user:
    User.objects.create_superuser(username=username, email=email, password=password)
    print('Created superuser', username)
else:
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()
    print('Ensured superuser exists and password set')
