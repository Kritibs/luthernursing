from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import AccountSerializer
from .models import MyUser
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication


User = get_user_model()

@api_view(['GET'])
def apiOverviewAccounts(request):
    api_urls={
            'Accounts': '/accounts-list/',
            'Detail View' : '/account-detail/<str:pk>/',
            'Add': '/add-account',
            'Update':'/update-account/<str:pk>/',
            'Delete' : '/delete-account/<str:pk>',
            }
    return Response(api_urls)

@api_view(['GET'])
def accountsList(request):
    queryset=MyUser.objects.all().order_by('-id')
    account_serializer=AccountSerializer(queryset,many=True)
    return Response(account_serializer.data)

@api_view(['GET'])
def accountDetail(request, pk):
    queryset=MyUser.objects.get(id=pk)
    account_serializer=AccountSerializer(queryset,many=False)
    return Response(account_serializer.data)

@api_view(['POST'])
def addAccount(request):
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
                account_serializer=AccountSerializer(data=request.data)

                if account_serializer.is_valid():
                    account_serializer.save()
                    return Response(account_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'You Are Not Authorised To Post'}, status.HTTP_401_UNAUTHORIZED)
            

    else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def updateAccount(request,pk):
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

        updated_data = request.data
        instance = MyUser.objects.get(id=pk)
        admin_user = User.objects.get(pk=1)  
        
        if(logged_in_user == admin_user):
            serializer = AccountSerializer(instance, data=updated_data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                    return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You Are Not Authorised To Post'}, status.HTTP_401_UNAUTHORIZED)
            

    else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteAccount(request,pk):
    if request.method == 'DELETE':
        if request.META.get('HTTP_AUTHORIZATION'):
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

            instance = MyUser.objects.get(id= pk)
            admin_user = User.objects.get(pk=1)  
            if(logged_in_user == admin_user):
                instance.delete()
                return Response("Item successfully Deleted!", status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'You Are Not Authorised To Post'}, status.HTTP_401_UNAUTHORIZED)
                
        else:
                return Response({'detail': 'idk'}, status=status.HTTP_400_BAD_REQUEST)

    else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)

