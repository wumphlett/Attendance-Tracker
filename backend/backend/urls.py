from django.contrib import admin
from django.urls import include, path

import django_cas_ng.views
from rest_framework_simplejwt import views as jwt_views

from attendance.views import APILoginView, Upload_picture


urlpatterns = [
    path('api/', include('attendance.urls')),
    path('admin/', admin.site.urls),
    path('accounts/login/', APILoginView.as_view(), name='cas_ng_login'),
    path('accounts/logout/', django_cas_ng.views.LogoutView.as_view(), name='cas_ng_logout'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    path('pic_upload/', Upload_picture.pic_upload, name='Pic_upload'),
]
