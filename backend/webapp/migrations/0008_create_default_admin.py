from django.db import migrations


def create_default_admin(apps, schema_editor):
    """Ensure the default admin user exists with known credentials."""
    # Use get_user_model to support custom user model.
    from django.contrib.auth import get_user_model

    User = get_user_model()
    username = 'admin'
    password = 'Admin123!'
    email = 'admin@example.com'

    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    user.is_staff = True
    user.is_superuser = True
    user.user_type = 'Admin'
    user.set_password(password)
    user.save()


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0007_classsession_module_alter_student_program'),
    ]

    operations = [
        migrations.RunPython(create_default_admin, reverse_code=migrations.RunPython.noop),
    ]
