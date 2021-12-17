from rest_framework import serializers
from .models import MyUser

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields='__all__'
