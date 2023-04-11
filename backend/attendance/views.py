from datetime import datetime

from rest_framework import mixins, status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers
from . import signals
from .permissions import PresentersViewAndEditOnly, SessionPresentersCreateAndRespondersViewOnly

# TODO TEMP
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
# TODO TEMP


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return models.User.objects.all()


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
        return models.Question.objects.filter(presentation__owner=self.request.user)

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
    permission_classes = [PresentersViewAndEditOnly]

    def get_queryset(self):
        return models.Answer.objects.filter(question__presentation__owner=self.request.user)

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
    def join(self, request, pk=None):
        if request.query_params.get('token') is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        session = models.Session.objects.filter(join_code=request.query_params.get('token')).first()
        if session is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.SessionJoinSerializer(session, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def respond(self, request, pk=None):
        session = self.get_object()
        serializer = serializers.ResponderSessionSerializer(session, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def next(self, request, pk=None):
        session = self.get_object()
        if session.end_time is not None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if session.current_question is None:
            if session.end_time is None:
                session.current_question = session.presentation.question_set.first()
        elif not session.is_accepting_responses:
            session.is_accepting_responses = True
        else:
            questions = list(session.presentation.question_set.all())  # type: list
            question_idx = questions.index(session.current_question)

            if question_idx == len(questions) - 1:
                session.join_code = None
                session.current_question = None
                session.end_time = datetime.now()
            else:
                session.current_question = questions[question_idx+1]

            session.is_accepting_responses = False

        session.save()
        serializer = serializers.SessionDetailSerializer(session, context={'request': request})
        return Response(serializer.data)


class ResponseViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.ResponseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        response, created = serializer.Meta.model.objects.update_or_create(
            user=self.request.user,
            session=serializer.validated_data['session'],
            answer__question=serializer.validated_data['answer'].question,
            defaults={"user": self.request.user, **serializer.validated_data}
        )

        headers = self.get_success_headers(serializer.data)
        return Response({"created": created}, status=status.HTTP_201_CREATED, headers=headers)

# TODO https://www.linkedin.com/pulse/integrate-django-cas-sso-ui-json-web-token-jwt-razaqa-dhafin-haffiyan/
# TODO TEMP
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
