from django.contrib import admin

from ecommerce.address.models import ShippingAddress


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    model = ShippingAddress
