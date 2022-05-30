from django.contrib import admin

from ecommerce.product.models import Product, ProductItem


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(ProductItem)
class ProductItemAdmin(admin.ModelAdmin):
    model = ProductItem
