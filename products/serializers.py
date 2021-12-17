from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product_author'] = instance.product_author.email
        return ret
