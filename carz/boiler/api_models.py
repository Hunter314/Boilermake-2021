from django.shortcuts import render
from .models import Car
from rest_framework import serializers

#returns only forms necessary for serach
# class PlanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Plan
#         fields = ['months','title','price']
# class FormsSerializerCreate(serializers.HyperlinkedModelSerializer):
#     requirements = RequirementsSerializer(read_only = True, many = True)
#     questions = QuestionsSerializer(read_only = True,many = True)
#     class Meta:
#         model = Forms
#         fields = ['id','name','description','pay','weekly_hours','tagline','category','requirements','questions','published']
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['make','car_model','year','co2','n2o','co']