from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ecommerce.core.behaviours import StatusMixin


class OrderStatus(models.TextChoices):
    PLACED = 'PL', _('PLACED')
    PROCESSING = 'PR', _('PROCESSING')
    ON_THE_WAY = 'OW', _('ON_THE_WAY')
    OUT_FOR_DELIVERY = 'OD', _('OUT_FOR_DELIVERY')
    DELIVERED = 'DL', _('DELIVERED')
    RETURN = 'RT', _('RETURN')
    FAILED = 'FL', _('FAILED')
    CANCELLED = 'CL', _('CANCELLED')
    EXCHANGE = 'EX', _('EXCHANGE')


class Order(StatusMixin, TimeStampedModel):
    user = models.ForeignKey('user.User', on_delete=models.SET_NULL, blank=True, null=True,
                             related_name='user_orders')
    tax_amount = models.DecimalField(_('Tax Amount'), max_digits=100, decimal_places=2, blank=True, null=True)
    shipping_amount = models.DecimalField(_('Shipping Amount'), max_digits=100, decimal_places=2, blank=True,
                                          null=True, default=0)
    total_amount = models.DecimalField(_('Total Amount'), max_digits=100, decimal_places=2, blank=True, null=True)

    status = models.CharField(_('Order Status'), max_length=2, choices=OrderStatus.choices,
                              default=OrderStatus.PLACED, blank=True, null=True)
    delivered_at = models.DateTimeField(_('Delivered At'), auto_now_add=False, blank=True, null=True)
    shipping_address = models.ForeignKey('address.ShippingAddress', on_delete=models.SET_NULL, blank=True,
                                         null=True, related_name='shipping_address_orders')

    def __str__(self):
        return f'Order #{self.id} ({self.user.username})'
