# Generated by Django 3.0.10 on 2022-04-10 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20220405_2040'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255, verbose_name='Name of User'),
        ),
    ]