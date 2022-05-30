from django.contrib import admin

from ecommerce.order.models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    model = Order
