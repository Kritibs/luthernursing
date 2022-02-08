from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from accounts.models import MyUser
from django.urls import reverse
from django.http import HttpResponse
from .serializers import UserCreateSerializer
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response


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
    account_serializer=UserCreateSerializer(queryset,many=True)
    return Response(account_serializer.data)

@api_view(['GET'])
def accountDetail(request, pk):
    queryset=MyUser.objects.get(id=pk)
    account_serializer=UserCreateSerializer(queryset,many=False)
    return Response(account_serializer.data)

@api_view(['POST'])
def addAccount(request):
    account_serializer=UserCreateSerializer(data=request.data)
    if account_serializer.is_valid():
        account_serializer.save()
    return Response(account_serializer.data)

@api_view(['POST'])
def updateAccount(request,pk):
    account=MyUser.objects.get(id=pk)
    account_serializer=UserCreateSerializer(instance=account, data=request.data)
    if account_serializer.is_valid():
        account_serializer.save()
    return Response(account_serializer.data)
@api_view(['DELETE'])
def deleteAccount(request,pk):
    account=MyUser.objects.get(id=pk)
    account.delete()
    return Response("item successfully deleted")

