from django.urls import path
from . import views

urlpatterns=[
        path('', views.apiOverview, name="api-overview"),
        path('products-list', views.productsList, name='products-list'),
        path('product-detail/<str:pk>/', views.productDetail, name="product_detail"),
        path('add-product', views.addProduct, name="add_product"),
        path('update-product/<str:pk>/', views.updateProduct, name="update_product"),
        path('delete-product/<str:pk>/', views.deleteProduct, name="delete_product"),
        
        ]
 
