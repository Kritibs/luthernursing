from django.shortcuts import render
from django.http import HttpResponse
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Product

@api_view(['GET'])
def apiOverview(request):
    api_urls={
            'Products': '/products-list/',
            'Detail View' : '/product-detail/<str:pk>/',
            'Add': '/add-product',
            'Update':'/update-product/<str:pk>/',
            'Delete' : '/delete-product/<str:pk>',
            }
    return Response(api_urls)

@api_view(['GET'])
def productsList(request):
    queryset=Product.objects.all().order_by('-id')
    product_serializer=ProductSerializer(queryset, many=True)
    return Response(product_serializer.data)


@api_view(['GET'])
def productDetail(request, pk):
    product=Product.objects.get(id=pk)
    product_serializer=ProductSerializer(product, many=False)
    return Response(product_serializer.data)


@api_view(['POST'])
def addProduct(request, pk):
    product_serializer=ProductSerializer(data=request.data)

    if product_serializer.is_valid():
        product_serializer.save()

    return Response(product_serializer.data)


@api_view(['POST'])
def updateProduct(request, pk):
    product=Product.objects.get(id=pk)
    product_serializer=ProductSerializer(instance=task, data=request.data)

    if product_serializer.is_valid:
        product_serializer.save()

    return Response(product_serializer.data)


@api_view(['DELETE'])
def deleteProduct(request, pk):
    product=Product.objects.get(id=pk)
    product.delete()
    return Response("item successfully deleted")
