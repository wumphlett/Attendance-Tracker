from django.db import models

# Create your models here.
class Picture(models.Model):
    picture = models.ImageField(upload_to='pictures/')