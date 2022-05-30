from django.contrib import admin

from ecommerce.payment.models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    model = Payment
