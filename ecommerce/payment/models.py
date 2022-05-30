from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ecommerce.core.behaviours import StatusMixin


class PaymentStatus(models.TextChoices):
    PENDING = 'PE', _('PENDING')
    PROCESSING = 'PR', _('PROCESSING')
    SUCCESSFUL = 'SF', _('SUCCESSFUL')
    FAILED = 'FA', _('FAILED')
    REFUND = 'RE', _('REFUND')


class Payment(StatusMixin, TimeStampedModel):
    order = models.OneToOneField('order.Order', on_delete=models.SET_NULL, blank=True, null=True,
                                 related_name='order_payment')
    payment_method = models.CharField(_('Payment Method'), max_length=100, blank=True, null=True)
    payment_status = models.CharField(_('Payment Status'), max_length=2, choices=PaymentStatus.choices,
                                      default=PaymentStatus.PENDING, blank=True, null=True)
    amount = models.DecimalField(_('Amount'), max_digits=100, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'Payment #{self.id}'


