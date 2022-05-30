from rest_framework import serializers

from ecommerce.payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        exclude = ('is_deleted',)
