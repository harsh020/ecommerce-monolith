import decimal

from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ecommerce.core.behaviours import StatusMixin


class Review(StatusMixin, TimeStampedModel):
    author = models.ForeignKey('user.User', on_delete=models.SET_NULL, blank=True, null=True,
                               related_name='user_reviews')
    product = models.ForeignKey('product.Product', on_delete=models.SET_NULL, blank=True, null=True,
                                related_name='product_reviews')
    rating = models.DecimalField(_('Rating'), max_digits=10, decimal_places=2, blank=True, null=True)
    comment = models.TextField(_('Comment'), blank=True, null=True)

    def save(self, *args, **kwargs):
        total = self.product.rating * self.product.num_reviews
        new_rating = (self.rating + decimal.Decimal(total)) / (self.product.num_reviews + 1)

        self.product.rating = round(new_rating, 2)
        self.product.num_reviews += 1
        self.product.save()

        super(Review, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.author.username}_{self.product.slug}'
