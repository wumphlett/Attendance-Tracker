from django.dispatch import receiver
from django_cas_ng.signals import cas_user_authenticated, cas_user_logout


@receiver(cas_user_authenticated)
def cas_user_authenticated_callback(sender, **kwargs):
    user = kwargs["user"]
    created = kwargs["created"]
    attributes = kwargs["attributes"]

    print(kwargs["username"])
    if created:
        print("Created")
        user.email = attributes["email"]
        user.first_name = attributes["firstName"]
        user.last_name = attributes["lastName"]

        if "Faculty" in attributes.get("group", ""):
            user.is_presenter = True

        if any(dev == kwargs["username"] for dev in ("wah0028",)):
            print("Superuser")
            user.is_superuser = True
            user.is_staff = True

    user.save()


@receiver(cas_user_logout)
def cas_user_logout_callback(sender, **kwargs):
    ...
