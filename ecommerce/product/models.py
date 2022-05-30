from django.db import models
from django.utils.text import slugify
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ecommerce.core.behaviours import StatusMixin


class Product(StatusMixin, TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, blank=True, null=True)
    slug = models.SlugField(_('Slug'), max_length=200, blank=True, null=True, db_index=True)
    image = models.ImageField(_('Image'), blank=True, null=True, default='placeholder.png')
    description = models.TextField(_('Description'), blank=True, null=True)
    brand = models.CharField(_('Brand'), max_length=100, blank=True, null=True)
    category = models.CharField(_('Category'), max_length=100, blank=True, null=True)
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2, blank=True, null=True, default=0.0)
    count_in_stock = models.IntegerField(_('Count'), blank=True, null=True, default=0)
    rating = models.FloatField(_('Rating'), blank=True, null=True, default=0.0)
    num_reviews = models.IntegerField(_('Num Reviews'), blank=True, null=True, default=0)
    seller = models.ForeignKey('user.User', on_delete=models.SET_NULL, blank=True, null=True,
                               related_name='products')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductItem(StatusMixin, TimeStampedModel):
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE, blank=True, null=True,
                                related_name='product_product_item')
    order = models.ForeignKey('order.Order', on_delete=models.SET_NULL, blank=True, null=True,
                              related_name='order_product_items')
    quantity = models.IntegerField(_('Quantity'), blank=True, null=True)

    def __str__(self):
        return self.product.name
