from django.dispatch import receiver
from django_cas_ng.signals import cas_user_authenticated, cas_user_logout

from .models import User


@receiver(cas_user_authenticated)
def cas_user_authenticated_callback(sender, **kwargs):
    attributes = kwargs["attributes"]
    print(attributes)

    if not User.objects.filter(username=kwargs["username"]).first():
        user = kwargs["user"]
        # created = kwargs["created"]
        attributes = kwargs["attributes"]
        print(attributes)

        user.username = kwargs["username"]
        user.email = attributes["email"]
        user.first_name = attributes["firstName"]
        user.last_name = attributes["lastName"]

        if "Faculty" in attributes.get("group", ""):
            user.is_presenter = True

        if any(dev == kwargs["username"] for dev in ("wah0028", "ewb0020", "qzl0037")):
            user.is_superuser = True
            user.is_staff = True

        user.save()


@receiver(cas_user_logout)
def cas_user_logout_callback(sender, **kwargs):
    ...
