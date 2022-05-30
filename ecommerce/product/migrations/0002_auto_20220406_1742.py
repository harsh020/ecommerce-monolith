# Generated by Django 3.0.10 on 2022-04-06 17:42

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
        migrations.AddField(
            model_name='product',
            name='sellers',
            field=models.ManyToManyField(blank=True, null=True, related_name='products', to=settings.AUTH_USER_MODEL),
        ),
    ]
