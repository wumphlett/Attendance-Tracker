import string

from django.contrib.auth import authenticate
from django.utils.crypto import get_random_string
from rest_framework import exceptions, serializers

from rest_framework_simplejwt.tokens import RefreshToken

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['first_name', 'last_name', 'email']


class AnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['id', 'symbol', 'text', 'is_correct']


class QuestionListSerializer(serializers.ModelSerializer):
    answer_set = AnswerListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['id', 'text', 'index', 'is_partial_allowed', 'answer_set']


class PresentationListSerializer(serializers.ModelSerializer):
    question_set = QuestionListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Presentation
        fields = ['id', 'name', 'description', 'question_set']


class SessionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Session
        fields = ['id', 'join_code', 'start_time', 'end_time']


class PresentationDetailSerializer(serializers.ModelSerializer):
    question_set = QuestionListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Presentation
        fields = ['id', 'name', 'description', 'question_set']


class QuestionDetailSerializer(serializers.ModelSerializer):
    answer_set = AnswerListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['id', 'presentation', 'index', 'text', 'is_partial_allowed', 'answer_set']


class AnswerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['id', 'question', 'index', 'symbol', 'text', 'is_correct']


class SessionDetailSerializer(serializers.ModelSerializer):
    current_question = QuestionDetailSerializer(read_only=True)

    class Meta:
        model = models.Session
        fields = ['id', 'presentation', 'current_question', 'is_accepting_responses', 'join_code', 'start_time', 'end_time']
        read_only_fields = ['current_question', 'is_accepting_responses', 'join_code', 'start_time', 'end_time']

    def validate(self, data, **kwargs):
        if data['presentation'].owner != self.context['request'].user:
            raise serializers.ValidationError("you cannot create a session for a presentation you do not own")
        if len(data['presentation'].question_set.all()) == 0:
            raise serializers.ValidationError("presentation must have at least one question")
        return data

    def create(self, validated_data):
        if session := self.Meta.model.objects.filter(presentation=validated_data['presentation'], end_time__isnull=True).first():
            return session
        return self.Meta.model.objects.create(join_code=get_random_string(5, string.ascii_uppercase), **validated_data)


class ResponseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Response
        fields = ['session', 'answer']

    def validate(self, data, **kwargs):
        if data['session'].end_time is not None:
            raise serializers.ValidationError("session is already closed")
        if data['session'].presentation != data['answer'].question.presentation:
            raise serializers.ValidationError("response answer presentation must match response session presentation")
        if data['session'].current_question != data['answer'].question:
            raise serializers.ValidationError("response given to a past question")
        if not data['session'].is_accepting_responses:
            raise serializers.ValidationError("response given to a closed question")
        return data


class PresentationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Presentation
        fields = ['name', 'description']


class QuestionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = ['index', 'text', 'is_partial_allowed']


class AnswerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['index', 'symbol', 'text', 'is_correct']


class SessionJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Session
        fields = ['id']


class ResponderAnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['id', 'index', 'symbol']


class ResponderQuestionDetailSerializer(serializers.ModelSerializer):
    answer_set = ResponderAnswerListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['id', 'index', 'answer_set']


class ResponderSessionSerializer(serializers.ModelSerializer):
    current_question = ResponderQuestionDetailSerializer(read_only=True)

    class Meta:
        model = models.Session
        fields = ['id', 'current_question', 'is_accepting_responses', 'start_time', 'end_time']
