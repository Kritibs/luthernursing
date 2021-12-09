from django.urls import include, path
from django.contrib import admin
from products import views
# from rest_framework.routers import DefaultRouter
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

# router=routers.DefaultRouter()
# router.register(r'products', views.ProductView)


urlpatterns = [
    path('products/', include('products.urls')),
    path('admin/', admin.site.urls),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
