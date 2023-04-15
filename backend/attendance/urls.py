from django.urls import include, path
from rest_framework import routers

from . import views

from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('users', views.UserViewSet, basename="user")
router.register('presentations', views.PresentationViewSet, basename="presentation")
router.register('questions', views.QuestionViewSet, basename="question")
router.register('answers', views.AnswerViewSet, basename="answer")
router.register('sessions', views.SessionViewSet, basename="session")
router.register('responses', views.ResponseViewSet, basename="response")

urlpatterns = [
    path('', include(router.urls)),

    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
