from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()


@receiver(post_save, sender=User)
def mirror_user_to_postgres(sender, instance, created, **kwargs):
    """
    Optional: Mirror User instances to a secondary Postgres database (DATABASES['pg']).

    This only runs when a 'pg' database is configured in settings.DATABASES. The
    handler will create or update a lightweight copy of the User in the 'pg'
    database in a table named 'webapp_user_copy' (created dynamically via raw SQL
    if it doesn't exist).

    NOTE: This is a pragmatic approach for small deployments or admin workflows
    where you want user records present in a Postgres DB visible in pgAdmin.
    For production systems, prefer proper multi-db model routing or a dedicated
    replication/sync mechanism.
    """
    if 'pg' not in settings.DATABASES:
        return

    # Build a minimal representation of the user
    data = {
        'id': instance.pk,
        'username': instance.username,
        'email': instance.email or '',
        'first_name': instance.first_name or '',
        'last_name': instance.last_name or '',
        'is_active': instance.is_active,
        'is_staff': instance.is_staff,
        'is_superuser': instance.is_superuser,
    }

    from django.db import connections, transaction

    conn = connections['pg']
    with conn.cursor() as cur:
        # Ensure the table exists (simple schema matching some User fields)
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS webapp_user_copy (
                id bigint PRIMARY KEY,
                username varchar(150) NOT NULL,
                email varchar(254) NOT NULL,
                first_name varchar(150) NOT NULL,
                last_name varchar(150) NOT NULL,
                is_active boolean NOT NULL,
                is_staff boolean NOT NULL,
                is_superuser boolean NOT NULL
            );
            """
        )

        # Upsert the record (Postgres-specific ON CONFLICT)
        cur.execute(
            """
            INSERT INTO webapp_user_copy (id, username, email, first_name, last_name, is_active, is_staff, is_superuser)
            VALUES (%(id)s, %(username)s, %(email)s, %(first_name)s, %(last_name)s, %(is_active)s, %(is_staff)s, %(is_superuser)s)
            ON CONFLICT (id) DO UPDATE SET
                username = EXCLUDED.username,
                email = EXCLUDED.email,
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                is_active = EXCLUDED.is_active,
                is_staff = EXCLUDED.is_staff,
                is_superuser = EXCLUDED.is_superuser;
            """,
            data,
        )
        # Commit the transaction on this connection
        transaction.set_autocommit(True, using='pg')
