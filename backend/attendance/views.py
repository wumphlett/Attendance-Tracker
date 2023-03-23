from datetime import datetime

from rest_framework import mixins, status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers
from .permissions import PresentersViewAndEditOnly, SessionPresentersCreateAndRespondersViewOnly

# TODO TEMP
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
# TODO TEMP


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return models.User.objects.all().order_by('-date_joined')


class PresentationViewSet(viewsets.ModelViewSet):
    permission_classes = [PresentersViewAndEditOnly]

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
    permission_classes = [PresentersViewAndEditOnly]

    def get_queryset(self):
        return models.Question.objects.filter(presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.QuestionListSerializer
        elif self.action in ('update', 'partial_update'):
            return serializers.QuestionUpdateSerializer
        return serializers.QuestionDetailSerializer

    @action(detail=True, methods=['get'])
    def view(self, request, pk=None):
        question = self.get_object()
        serializer = serializers.QuestionDetailSerializer(question, context={'request': request})
        return Response(serializer.data)


class AnswerViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [PresentersViewAndEditOnly]

    def get_queryset(self):
        return models.Answer.objects.filter(question__presentation__owner=self.request.user).order_by('index')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.AnswerListSerializer
        elif self.action in ('update', 'partial_update'):
            return serializers.AnswerUpdateSerializer
        return serializers.AnswerDetailSerializer


class SessionViewSet(viewsets.ModelViewSet):
    permission_classes = [SessionPresentersCreateAndRespondersViewOnly]
    http_method_names = ['get', 'post', 'head', 'options']

    def get_queryset(self):
        return models.Session.objects.filter(presentation__owner=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.SessionListSerializer
        return serializers.SessionDetailSerializer

    @action(detail=False, methods=['get'])
    def join(self, request):
        if request.query_params.get('token') is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        session = models.Session.objects.filter(join_code=request.query_params.get('token')).first()
        if session is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.SessionJoinSerializer(session, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def next(self, request, pk=None):
        session = self.get_object()
        serializer = serializers.SessionDetailSerializer(data=request.data)
        if not serializer.is_valid() or session.end_time is not None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        questions = list(session.presentation.question_set.all().order_by('index'))  # type: list
        if len(questions) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if not session.is_accepting_responses:
            question_idx = questions.index(session.current_question) if session.current_question is not None else -1
            if question_idx == len(questions) - 1:
                session.join_code = None
                session.current_question = None
                session.end_time = datetime.now()
            else:
                session.current_question = questions[question_idx+1]
            session.is_accepting_responses = True
        else:
            session.is_accepting_responses = False

        session.save()
        return Response({'status': 'ok'})


# TODO TEMP
class ResponseViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.ResponseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
