import csv
from datetime import datetime

from django.http import HttpResponse, HttpResponseRedirect

from rest_framework import mixins, status, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from django_cas_ng import views as cas_views

from . import models
from . import geolocate
from . import serializers
from . import signals
from .permissions import PresentersViewAndEditOnly, SessionPresentersCreateAndRespondersViewOnly


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

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), context={'request': request}, many=True)
        return Response({"presentations": serializer.data, "user": serializers.UserSerializer(request.user, context={'request': request}).data})


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
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        return models.Session.objects.filter(presentation__owner=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.SessionListSerializer
        elif self.action in ('update', 'partial_update'):
            return serializers.SessionUpdateSerializer
        return serializers.SessionDetailSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if request.query_params.get('presentation') and request.query_params.get('presentation').isdigit():
            queryset = queryset.filter(presentation__id=int(request.query_params.get('presentation')))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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
        elif not session.is_accepting_responses and not session.is_post_responses:
            session.is_accepting_responses = True
        elif session.is_accepting_responses and not session.is_post_responses:
            session.is_post_responses = True
            session.is_accepting_responses = False
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
            session.is_post_responses = False

        session.save()
        serializer = serializers.SessionDetailSerializer(session, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def export(self, request, pk=None):
        is_geolocated = request.query_params.get('geolocate', "True")  # Enforce geolocation by default
        is_geolocated = True if is_geolocated == "True" else False
        session = self.get_object()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{"GEOLOCATED" if is_geolocated else "NOT-GEOLOCATED"}-sess-exp-{session.start_time.strftime("%Y-%m-%d_%H-%M")}.csv"'

        writer = csv.writer(response)

        writer.writerow(["Student", "ID", "SIS User ID", "SIS Login ID", "Section", session.presentation.name])
        writer.writerow(["Points Possible", "", "", "", "", session.presentation.question_set.count()])

        user_ids = models.Response.objects.filter(session=session).values_list("user__id", flat=True).distinct()

        for student in models.User.objects.filter(id__in=user_ids):
            points = models.Response.objects.filter(session=session, user=student, answer__is_correct=True)  # TODO This will not work if you add partial credit
            if is_geolocated:
                points = points.filter(is_geolocated=is_geolocated)
            writer.writerow([f'{student.last_name}, {student.first_name}', "", f"{student.email.split('@')[0]}", f"{student.email.split('@')[0]}", "", points.count()])

        return response


class ResponseViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.ResponseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        long = request.data.pop("long", None)
        lat = request.data.pop("lat", None)
        acc = request.data.pop("acc", None)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session = serializer.validated_data['session']
        if session.lat and session.long:
            distance = geolocate.calculate_distance(session.lat, session.long, lat, long)
            is_geolocated = distance < geolocate.ATTENDANCE_DISTANCE_M + float(session.acc) + acc
        else:
            is_geolocated = True

        response, created = serializer.Meta.model.objects.update_or_create(
            user=self.request.user,
            session=serializer.validated_data['session'],
            answer__question=serializer.validated_data['answer'].question,
            is_geolocated=is_geolocated,
            defaults={"user": self.request.user, **serializer.validated_data}
        )

        headers = self.get_success_headers(serializer.data)
        return Response({"created": created}, status=status.HTTP_201_CREATED, headers=headers)


class APILoginView(cas_views.LoginView):
    def successful_login(self, request, next_page):
        refresh = RefreshToken.for_user(request.user)
        return HttpResponseRedirect(next_page + f"?refresh={refresh}&access={refresh.access_token}")
