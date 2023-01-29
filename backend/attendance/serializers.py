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
