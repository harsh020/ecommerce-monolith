# Generated by Django 3.0.10 on 2022-04-09 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_productitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Image'),
        ),
    ]
