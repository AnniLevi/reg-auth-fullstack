from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = User.api_fields


class RegisterSerializer(UserSerializer):
    class Meta:
        model = User
        fields = User.api_fields + ("password",)

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
    )

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return User.objects.create(**validated_data)
