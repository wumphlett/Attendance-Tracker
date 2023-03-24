from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet, basename="user")
router.register('presentations', views.PresentationViewSet, basename="presentation")
router.register('questions', views.QuestionViewSet, basename="question")
router.register('answers', views.AnswerViewSet, basename="answer")
router.register('sessions', views.SessionViewSet, basename="session")
router.register('responses', views.ResponseViewSet, basename="response")

urlpatterns = [
    path('', include(router.urls)),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
