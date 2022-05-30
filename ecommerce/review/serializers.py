from rest_framework import serializers

from ecommerce.product.serializers import ProductSerializer
from ecommerce.review.models import Review
from ecommerce.user.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ReviewDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    product = ProductSerializer()

    class Meta:
        model = Review
        fields = '__all__'
