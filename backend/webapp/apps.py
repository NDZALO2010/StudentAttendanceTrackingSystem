from django.apps import AppConfig


class WebappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'webapp'

    def ready(self):
        # Import signal handlers to ensure they are registered when app is ready
        try:
            import webapp.signals  # noqa: F401
        except Exception:
            pass
