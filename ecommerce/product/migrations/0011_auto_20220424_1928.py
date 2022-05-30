# Generated by Django 3.0.10 on 2022-04-24 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0010_auto_20220420_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='placeholder.png', null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='productitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_product_item', to='product.Product'),
        ),
    ]