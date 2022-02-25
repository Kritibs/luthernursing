from django.urls import path
from . import views

urlpatterns=[
        path('', views.apiOverview, name="api-overview"),
        path('blogs-list/', views.blogsList, name='blogs-list'),
        path('blog-detail/<str:pk>/', views.blogDetail, name="blog_detail"),
        path('add-blog', views.addBlog, name="add_blog"),
        path('update-blog/<str:pk>/', views.updateBlog, name="update_blog"),
        path('delete-blog/<str:pk>/', views.deleteBlog, name="delete_blog"),
        
        ]
