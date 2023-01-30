import string

from django.utils.crypto import get_random_string
from rest_framework import serializers

from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['url', 'first_name', 'last_name', 'email']


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


class AnswerHiddenListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['url', 'index', 'symbol', 'text']


class SessionListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Session
        fields = ['url', 'join_code', 'start_time', 'end_time']


class PresentationDetailSerializer(serializers.HyperlinkedModelSerializer):
    question_set = QuestionListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Presentation
        fields = ['url', 'name', 'description', 'question_set']


class QuestionDetailSerializer(serializers.HyperlinkedModelSerializer):
    answer_set = AnswerListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['url', 'presentation', 'index', 'text', 'answer_set']


class QuestionHiddenDetailSerializer(serializers.HyperlinkedModelSerializer):
    answer_set = AnswerHiddenListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Question
        fields = ['answer_set']


class AnswerDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Answer
        fields = ['url', 'question', 'index', 'symbol', 'text', 'is_correct']


class SessionDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Session
        fields = ['url', 'presentation', 'current_question', 'join_code', 'start_time', 'end_time']
        read_only_fields = ['current_question', 'join_code', 'start_time', 'end_time']

    def create(self, validated_data):
        if session := self.Meta.model.objects.filter(end_time__isnull=True).first():
            return session
        return self.Meta.model.objects.create(join_code=get_random_string(5, string.ascii_uppercase), **validated_data)


class SessionJoinSerializer(serializers.HyperlinkedModelSerializer):
    current_question = QuestionHiddenDetailSerializer(read_only=True)

    class Meta:
        model = models.Session
        fields = ['url', 'current_question']


class ResponseDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Response
        fields = ['session', 'user', 'answer']

    def validate(self, data, **kwargs):
        if data['session'].end_time is not None:
            raise serializers.ValidationError("session is already closed")
        if data['session'].presentation != data['answer'].question.presentation:
            raise serializers.ValidationError("response answer presentation must match response session presentation")
        if data['session'].current_question != data['answer'].question:
            raise serializers.ValidationError("response given to a past question")
        return data

    def create(self, validated_data):
        if response := self.Meta.model.objects.filter(
                session=validated_data['session'], answer__question=validated_data['answer'].question
        ).first():
            response.answer = validated_data['answer']
            response.save()
        else:
            response = self.Meta.model.objects.create(**validated_data)
        return response


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
