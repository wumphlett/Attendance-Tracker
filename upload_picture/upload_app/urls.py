from django.urls import path
from .import  views
from django.conf.urls.static import static
from django.conf import settings

app_name = 'upload_app'
urlpatterns = [
    path('', views.mainPage, name = 'MainPage'),
    path('pic_upload/', views.pic_upload, name='Pic_upload'),
    path('pic_show/', views.pic_show, name='Pic_show'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
