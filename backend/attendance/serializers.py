from rest_framework.reverse import reverse
from rest_framework import serializers

from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['first_name', 'last_name', 'email']


class PresentationListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Presentation
        fields = ['url', 'name', 'description']


class QuestionListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Question
        fields = ['url', 'text']


class AnswerListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['url', 'symbol', 'text', 'is_correct']


class SessionListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Session
        fields = ['url', 'join_code', 'start_time', 'end_time']


class PresentationDetailSerializer(serializers.HyperlinkedModelSerializer):
    question_set = QuestionListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Presentation
        fields = ['name', 'description', 'question_set']


class QuestionDetailSerializer(serializers.HyperlinkedModelSerializer):
    answer_set = AnswerListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['presentation', 'index', 'text', 'answer_set']


class AnswerDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['question', 'index', 'symbol', 'text', 'is_correct']


class SessionDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Session
        fields = ['presentation', 'current_question', 'join_code', 'start_time', 'end_time']
        read_only_fields = ['current_question', 'join_code', 'start_time', 'end_time']


class PresentationUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Presentation
        fields = ['name', 'description']


class QuestionUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Question
        fields = ['index', 'text']


class AnswerUpdateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['index', 'symbol', 'text', 'is_correct']
