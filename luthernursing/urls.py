from django.urls import include, path, re_path
from django.contrib import admin
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView



urlpatterns = [
    path('products/', include('products.urls')),
    path('blogs/', include('blogs.urls')),
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns+=[re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
