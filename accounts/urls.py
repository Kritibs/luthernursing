from django.urls import path
from . import views

urlpatterns=[
    path('', views.apiOverviewAccounts, name='api_overview_accounts'),
    path('accounts-list', views.accountsList, name='accounts-list'),
    path('account-detail/<str:pk>/', views.accountDetail, name="account_detail"),
    path('add-account', views.addAccount, name="add_account"),
    path('update-account/<str:pk>/', views.updateAccount, name="update_account"),
    path('delete-account/<str:pk>/', views.deleteAccount, name="delete_account"),
]
