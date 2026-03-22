#!/bin/bash
# Railway post-deployment setup script
# Run this in Railway shell after first deployment

echo "=== EdTrack3 Railway Setup ==="
echo ""
echo "Running Django migrations..."
python manage.py migrate

echo ""
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo ""
echo "Checking Django setup..."
python manage.py check

echo ""
echo "=== Setup Complete ==="
echo "Next: Create a superuser with:"
echo "  python manage.py createsuperuser"
