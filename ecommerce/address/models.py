from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from ecommerce.core.behaviours import AddressMixin, StatusMixin


class ShippingAddress(StatusMixin, TimeStampedModel):
    user = models.ManyToManyField('user.User', blank=True, null=True, related_name='user_shipping_addresses')
    address = models.CharField(_('Address'), max_length=100, blank=True, null=True)
    city = models.CharField(_('City'), max_length=100, blank=True, null=True)
    state = models.CharField(_('State'), max_length=100, blank=True, null=True)
    country = models.CharField(_('Country'), max_length=100, blank=True, null=True)
    pincode = models.CharField(_("Pincode"), max_length=10, blank=True, null=True)
    shipping_amount = models.DecimalField(_('Shipping Amount'), max_digits=100, decimal_places=2, blank=True,
                                          null=True, default=0)

    def __str__(self):
        return f'{self.id} - {self.address}, {self.city}, {self.state}, {self.country} ({self.pincode})'

    class Meta:
        verbose_name_plural = 'Shipping Addresses'
