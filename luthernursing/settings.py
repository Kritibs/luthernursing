"""
Django settings for luthernursing project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-exw4my3sgq_x3&=k+3%gn-uaex29lb-slql+x_7f++nag8rr$o'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
        '*',
        'luthernursing.herokuapp.com',
        ]


# Application definition

INSTALLED_APPS = [
    'products.apps.ProductsConfig',
    'blogs.apps.BlogsConfig',
    'accounts.apps.AccountsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'djoser',
    'rest_framework',
    'rest_framework_jwt',
    'rest_framework_simplejwt',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'luthernursing.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'luthernursing.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv("Name"),
        'USER': os.getenv("User"),
        'PASSWORD': os.getenv("Password"),
        'HOST': os.getenv("Host"),
        'PORT': os.getenv("Port"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL='/media/'

MEDIA_ROOT=os.path.join(BASE_DIR, 'media')

STATICFILES_DIRS= (os.path.join(BASE_DIR, 'build/static'),)

STATIC_ROOT=os.path.join(BASE_DIR, 'static')
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
"http://localhost:3000",
"http://localhost:8000",
"http://127.0.0.1:8000",
"http://127.0.0.1:3000",
]
CORS_ORIGIN_WHITELIST=[
        "http://localhost:3000/add-products",
        "http://localhost:3000/add-accounts",
        "http://localhost:3000",
        "http://localhost:8000",
        ]
AUTH_USER_MODEL = 'accounts.MyUser'

AUTHENTICATION_BACKENDS=(
    'django.contrib.auth.backends.ModelBackend',
    'accounts.backend.MyBackend',
)


EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_HOST_USER='luthernursingclub@gmail.com'
EMAIL_HOST_PASSWORD = 'ykskkuuzgozskpwm'
EMAIL_USE_TLS=True


DJOSER={
        'LOGIN_FIELD' : 'email',
        'USER_CREATE_PASSWORD_RETYPE':True,
        'USERNAME_CHANGED_EMAIL_CONFIRMATION':True,
        'PASSWORD_CHANGED_EMAIL_CONFIRMATION':True,
        'SEND_CONFIRMATION_EMAIL':True,
        'SET_PASSWORD_RETYPE':True,
        'PASSWORD_RESET_CONFIRM_RETYPE': True,
        'PASSWORD_RESET_CONFIRM_URL':'password/reset/confirm/{uid}/{token}',
        'ACTIVATION_URL':'activate/{uid}/{token}',
        'SEND_ACTIVATION_EMAIL':True,
        'SERIALIZERS': {

            'user_create':'accounts.serializers.UserCreateSerializer',
            'user': 'accounts.serializers.UserCreateSerializer',
            'user_delete':'djoser.serializers.UserDeleteSerializer',
            'password_reset_confirm': 'djoser.serializers.PasswordResetConfirmSerializer',
            'password_reset_confirm_retype': 'djoser.serializers.PasswordResetConfirmRetypeSerializer',
        }

        }

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

JWT_AUTH = {
    # Authorization:Token xxx
    'JWT_AUTH_HEADER_PREFIX': 'Token',
}
