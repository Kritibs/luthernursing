from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        # fields=('product_image','product_name', 'product_price', 'pub_date', 'product_author')
        fields='__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product_author'] = {"id": instance.product_author.id, "username": instance.product_author.username}
        return ret
