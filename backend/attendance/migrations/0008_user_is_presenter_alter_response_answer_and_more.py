# Generated by Django 4.1.5 on 2023-01-30 06:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0007_alter_session_join_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_presenter',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='response',
            name='answer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='attendance.answer'),
        ),
        migrations.AlterField(
            model_name='response',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='attendance.session'),
        ),
        migrations.AlterField(
            model_name='response',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='session',
            name='current_question',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='attendance.question'),
        ),
        migrations.AlterField(
            model_name='session',
            name='presentation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='attendance.presentation'),
        ),
    ]
