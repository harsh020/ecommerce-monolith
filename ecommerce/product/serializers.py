from rest_framework import serializers

from ecommerce.product.models import Product, ProductItem
from ecommerce.review.models import Review
from ecommerce.user.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    def find_by_slug(self, slug):
        instance = Product.objects.get(slug=slug)
        return instance

    class Meta:
        model = Product
        exclude = ('is_deleted',)


class ProductReviewSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Review
        exclude = ('is_deleted', 'product',)


class ProductDetailSerializer(ProductSerializer):
    seller = UserSerializer()
    reviews = ProductReviewSerializer(source='product_reviews', many=True)

    def find_by_slug(self, slug):
        instance = Product.objects.get(slug=slug)
        return instance

    class Meta:
        model = Product
        exclude = ('is_deleted',)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'image',)


class ProductItemSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        product = validated_data.pop('product')
        product_item = super().create(validated_data)

        product.count_in_stock -= product_item.quantity
        print(product)
        # product.product_product_item.set(product)
        print(product.count_in_stock)
        product.save()

        product_item.product = product
        product_item.save()
        return product_item

    class Meta:
        model = ProductItem
        exclude = ('is_deleted',)


class ProductItemDetailSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    product = ProductDetailSerializer()

    def get_name(self, instance):
        return instance.product.name

    def get_slug(self, instance):
        return instance.product.slug

    class Meta:
        model = ProductItem
        exclude = ('is_deleted',)
