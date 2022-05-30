from django.apps import AppConfig


class UserConfig(AppConfig):
    name = 'ecommerce.user'

    def ready(self) -> None:
        import ecommerce.user.signals
