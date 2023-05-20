from copy import copy
from json import dumps

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class AccountTests(APITestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data = {
            "username": "test_user",
            "password": "useruser123",
            "first_name": "test_user",
            "last_name": "test_user",
            "email": "apitest@test.test",
            "phone_number": "+48123456789",
            "country": "pln",
            "city": "wrsw",
        }

    def test_register(self):
        """Ensure we can create a new user object."""
        url = reverse("register")

        # GOOD CASE
        response = self.client.post(
            url, data=dumps(self.data), content_type="application/json"
        )
        # check status msg 201
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, msg=response.data
        )
        # check response data
        self.assertEqual(response.data["username"], self.data["username"])
        self.assertEqual(response.data["first_name"], self.data["first_name"])
        self.assertEqual(response.data["email"], self.data["email"])
        self.assertEqual(response.data["phone_number"], self.data["phone_number"])
        self.assertEqual(response.data["country"], self.data["country"])
        self.assertEqual(response.data["city"], self.data["city"])
        # check that endpoint does not reveal password
        self.assertFalse("password" in response.data)

        # check creating user obj in db
        user = User.objects.get(username=response.data["username"])
        self.assertEqual(response.data["username"], user.username)
        self.assertEqual(response.data["first_name"], user.first_name)
        self.assertEqual(response.data["last_name"], user.last_name)
        self.assertEqual(response.data["email"], user.email)
        self.assertEqual(response.data["phone_number"], user.phone_number)
        self.assertEqual(response.data["country"], user.country)
        self.assertEqual(response.data["city"], user.city)

        # BAD CASE
        # check unique username validation
        response = self.client.post(
            url, data=dumps(self.data), content_type="application/json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, msg=response.data
        )

        # check fields validation
        # incorrect email
        bad_email_data = copy(self.data)
        bad_email_data["username"] = "new_test_user"
        bad_email_data["email"] = "incorrect"
        response = self.client.post(
            url, data=dumps(bad_email_data), content_type="application/json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, msg=response.data
        )
        self.assertIn("email", response.data)
        # incorrect phone number
        bad_phone_data = copy(self.data)
        bad_phone_data["username"] = "new_test_user"
        bad_phone_data["phone_number"] = "123"
        response = self.client.post(
            url, data=dumps(bad_phone_data), content_type="application/json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, msg=response.data
        )
        self.assertIn("phone_number", response.data)

        # empty fields validation
        empty_first_name_data = copy(self.data)
        empty_first_name_data.pop("first_name")
        response = self.client.post(
            url, data=dumps(empty_first_name_data), content_type="application/json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, msg=response.data
        )
        self.assertIn("first_name", response.data)

    def test_profile(self):
        """Ensure we display user data correctly."""
        url = reverse("profile")

        # BAD CASE
        response = self.client.get(url, content_type="application/json")
        # check status msg 401 without credentials
        self.assertEqual(
            response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data
        )

        # GOOD CASE
        self.client.post(
            reverse("register"), data=dumps(self.data), content_type="application/json"
        )
        token = self.client.post(
            reverse("token_obtain"),
            data={
                "username": self.data["username"],
                "password": self.data["password"],
            },
        ).data["access"]

        # check status msg 200
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url, content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        # check response data
        self.assertEqual(response.data["username"], self.data["username"])
        self.assertEqual(response.data["first_name"], self.data["first_name"])
        self.assertEqual(response.data["email"], self.data["email"])
        self.assertEqual(response.data["phone_number"], self.data["phone_number"])
        self.assertEqual(response.data["country"], self.data["country"])
        self.assertEqual(response.data["city"], self.data["city"])
        # check that endpoint does not reveal password
        self.assertFalse("password" in response.data)
