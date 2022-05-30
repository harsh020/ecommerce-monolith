from rest_framework import serializers

from ecommerce.address.models import ShippingAddress
from ecommerce.core.models import City, State, Country
from ecommerce.core.serializers import CountrySerializer, StateSerializer, CitySerializer


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = ('is_deleted',)


class ShippingAddressDetailSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    def get_name(self, instance):
        return instance.user.name

    class Meta:
        model = ShippingAddress
        exclude = ('is_deleted', 'shipping_amount', 'user')
