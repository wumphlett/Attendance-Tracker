# Generated by Django 4.1.5 on 2023-01-30 04:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0004_remove_response_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='join_code',
            field=models.CharField(max_length=5),
        ),
    ]
