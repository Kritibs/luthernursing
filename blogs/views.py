from django.shortcuts import render
from django.http import HttpResponse
from .serializers import BlogSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import viewsets, status
from rest_framework.response import Response
from blogs.models import Blog
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
            'Blogs': '/blogs-list/',
            'Detail View' : '/blog-detail/<str:pk>/',
            'Add': '/add-blog',
            'Update':'/update-blog/<str:pk>/',
            'Delete' : '/delete-blog/<str:pk>',
            }
    return Response(api_urls)



@api_view(['GET'])
def blogsList(request):
    queryset=Blog.objects.all().order_by('-id')
    blog_serializer=BlogSerializer(queryset, many=True)
    return Response(blog_serializer.data)


@api_view(['GET'])
def blogDetail(request, pk):
    blog=Blog.objects.get(id=pk)
    blog_serializer=BlogSerializer(blog, many=False)
    return Response(blog_serializer.data)


@api_view(['POST'])
# @permission_classes((IsAdminUser,))
def addBlog(request):
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
                blog_serializer=BlogSerializer(data=request.data)

                if blog_serializer.is_valid():
                    blog_serializer.save()
                    return Response(blog_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'You Are Not Authorised To Post'}, status.HTTP_401_UNAUTHORIZED)
            

    else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
@permission_classes((IsAdminUser,))
def updateBlog(request, pk):
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
        instance = Blog.objects.get(id=pk)
        admin_user = User.objects.get(pk=1)  
        
        if(logged_in_user == admin_user):
            serializer = BlogSerializer(instance, data=updated_data)

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
def deleteBlog(request, pk):
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

            instance = Blog.objects.get(id= pk)
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

