# Generated by Django 4.1.5 on 2023-01-30 02:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0003_alter_answer_question_alter_question_presentation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='question',
        ),
    ]
