from django.contrib import admin
from django.urls import include, path

import django_cas_ng.views
from rest_framework_simplejwt import views as jwt_views

from backend.attendance import CASTokenObtainPairView


urlpatterns = [
    path('api/', include('attendance.urls')),
    path('admin/', admin.site.urls),
    path('accounts/login/', django_cas_ng.views.LoginView.as_view(), name='cas_ng_login'),
    path('accounts/logout/', django_cas_ng.views.LogoutView.as_view(), name='cas_ng_logout'),
    path('token/', CASTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
]
