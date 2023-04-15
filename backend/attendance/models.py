from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractUser):
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    is_presenter = models.BooleanField(default=False)

    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    class Meta:
        ordering = ("-date_joined",)

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
    index = models.PositiveSmallIntegerField()  # 0-indexed MUST BE CORRECT
    text = models.TextField()

    class Meta:
        verbose_name = "Question"
        ordering = ("index",)

    def __str__(self):
        return f"{self.index} : {self.text}"


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    index = models.PositiveSmallIntegerField()  # 0-indexed
    symbol = models.CharField(max_length=4)
    text = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Answer"
        ordering = ("index",)

    def __str__(self):
        return f"{self.symbol} : {self.text}"


class Session(models.Model):
    presentation = models.ForeignKey(Presentation, on_delete=models.PROTECT)
    current_question = models.ForeignKey(Question, on_delete=models.PROTECT, null=True, blank=True)
    is_accepting_responses = models.BooleanField(default=False)
    join_code = models.CharField(max_length=5, unique=True, null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True, editable=False)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Session"


class Response(models.Model):
    session = models.ForeignKey(Session, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    answer = models.ForeignKey(Answer, on_delete=models.PROTECT)

    class Meta:
        verbose_name = "Response"


class UploadedPicture(models.Model):
    username = models.CharField(max_length=30, unique=True, default='')
    original_name = models.CharField(max_length=255)
    renamed_name = models.CharField(max_length=255, unique=True)
    size = models.IntegerField()

    def __str__(self):
        return self.original_name