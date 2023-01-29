from rest_framework import views
from rest_framework import viewsets
from rest_framework import permissions

from . import models
from . import serializers


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return models.User.objects.all().order_by('-date_joined')


class PresentationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Presentation.objects.filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.PresentationListSerializer
        return serializers.PresentationDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# TODO views that disallow editing of foreign key fields once set


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Question.objects.filter(presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.QuestionListSerializer
        return serializers.QuestionDetailSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Answer.objects.filter(question__presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.AnswerListSerializer
        return serializers.AnswerDetailSerializer
