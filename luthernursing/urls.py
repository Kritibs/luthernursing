from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('products/', include('products.urls')),
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
