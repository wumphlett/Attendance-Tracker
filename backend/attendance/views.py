from datetime import datetime
import string

from django.utils.crypto import get_random_string

from rest_framework import mixins, status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers


# TODO find a way to filter questions by current presentation or


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
        elif self.action in ('update', 'partial_update'):
            return serializers.PresentationUpdateSerializer
        return serializers.PresentationDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class QuestionViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Question.objects.filter(presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.QuestionListSerializer
        elif self.action in ('update', 'partial_update'):
            return serializers.QuestionUpdateSerializer
        return serializers.QuestionDetailSerializer


class AnswerViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Answer.objects.filter(question__presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.AnswerListSerializer
        elif self.action in ('update', 'partial_update'):
            return serializers.AnswerUpdateSerializer
        return serializers.AnswerDetailSerializer


class SessionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'head', 'options']

    def get_queryset(self):
        return models.Session.objects.filter(presentation__owner=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.SessionListSerializer
        return serializers.SessionDetailSerializer

    def perform_create(self, serializer):
        serializer.save(join_code=get_random_string(5, string.ascii_uppercase))

    @action(detail=True, methods=['post'])
    def next(self, request, pk=None):
        session = self.get_object()
        serializer = serializers.SessionDetailSerializer(data=request.data)
        if not serializer.is_valid() or session.end_time is not None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        questions = list(session.presentation.question_set.all().order_by('index'))  # type: list
        if len(questions) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        question_idx = questions.index(session.current_question) if session.current_question is not None else 0
        if question_idx == len(questions) - 1:
            session.join_code = None
            session.current_question = None
            session.end_time = datetime.now()
        else:
            session.current_question = questions[question_idx+1]

        session.save()
        return Response({'status': 'ok'})
