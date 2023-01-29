from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractUser):
    username = None
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(_("email address"), max_length=150, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Presentation(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=300)

    class Meta:
        verbose_name = "Presentation"

    def __str__(self):
        return f"{self.owner.full_name} : {self.name}"


class Question(models.Model):
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    index = models.PositiveSmallIntegerField()
    text = models.TextField()

    class Meta:
        verbose_name = "Question"

    def __str__(self):
        return f"{self.index} : {self.text}"


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    index = models.PositiveSmallIntegerField()
    symbol = models.CharField(max_length=4)
    text = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Answer"

    def __str__(self):
        return f"{self.symbol} : {self.text}"


class Session(models.Model):
    join_code = models.PositiveSmallIntegerField()  # TODO generate on_create
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    current_question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True, editable=False)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Session"


# TODO add model validation in form.clean()
class Response(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Response"
