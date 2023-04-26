from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .forms import UserCreationForm, UserChangeForm
from . import models


@admin.register(models.User)
class UserAdmin(DefaultUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = models.User
    list_display = ("full_name", "email", "is_presenter", "is_staff")
    fieldsets = (
        (None, {"fields": (("first_name", "last_name"), "email", "password", "is_presenter")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    ("first_name", "last_name"),
                    "email",
                    "password1",
                    "password2",
                    "is_presenter",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    ordering = ("email",)
    search_fields = ("email",)


@admin.register(models.Presentation)
class PresentationAdmin(admin.ModelAdmin):
    list_display = ("owner", "name")
    fields = ("owner", "name", "description")
    search_fields = ("owner__full_name", "name")


@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("__str__", "presentation")
    list_filter = ("presentation",)
    fields = ("presentation", "index", "text")
    ordering = ("index",)


@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("__str__", "is_correct", "question")
    list_filter = ("question", "question__presentation")
    fields = ("question", "index", "symbol", "text", "is_correct")
    ordering = ("index",)


@admin.register(models.Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("join_code", "start_time", "end_time")
    list_filter = ("presentation",)
    fields = ("presentation", "join_code", "current_question", "start_time", "end_time")
    readonly_fields = ("start_time",)


@admin.register(models.Response)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ("user", "answer")
    list_filter = ("user", "session")
    fields = ("session", "user", "answer", "is_geolocated")
