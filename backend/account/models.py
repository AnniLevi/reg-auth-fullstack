from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    email = models.EmailField(_("email address"))
    phone_number = PhoneNumberField()
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    api_fields = (
        'id',
        'username',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'country',
        'city',
    )

    def __str__(self):
        return self.username
