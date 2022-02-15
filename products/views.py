from django.shortcuts import render
from django.http import HttpResponse
from .serializers import ProductSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import viewsets, status
from rest_framework.response import Response
from products.models import Product
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

User = get_user_model()

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
# @permission_classes((IsAdminUser,))
def addProduct(request):
    if request.method == 'POST':
            token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
            if(token_type != 'JWT'):
                return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

            token_data = {'token': token}

            try:
                jwt_object      = JWTAuthentication() 
                validated_token = jwt_object.get_validated_token(token)
                logged_in_user = jwt_object.get_user(validated_token)
            except:
                return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

            data = request.data
            admin_user = User.objects.get(pk=1) 
            if(logged_in_user == admin_user):
                product_serializer=ProductSerializer(data=request.data)

                if product_serializer.is_valid():
                    product_serializer.save()
                    return Response(product_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'You Are Not Authorised To Post'}, status.HTTP_401_UNAUTHORIZED)

    else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes((IsAdminUser,))
def updateProduct(request, pk):
    product=Product.objects.get(id=pk)
    product_serializer=ProductSerializer(instance=task, data=request.data)

    if product_serializer.is_valid:
        product_serializer.save()

    return Response(product_serializer.data)


@api_view(['DELETE'])
@permission_classes((IsAdminUser,))
def deleteProduct(request, pk):
    product=Product.objects.get(id=pk)
    product.delete()
    return Response("item successfully deleted")
