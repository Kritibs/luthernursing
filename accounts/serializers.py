from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User=get_user_model()


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
