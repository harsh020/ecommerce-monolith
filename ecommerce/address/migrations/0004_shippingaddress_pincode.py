# Generated by Django 3.0.10 on 2022-04-20 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0003_auto_20220420_1734'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='pincode',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='Pincode'),
        ),
    ]
