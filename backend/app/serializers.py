from .models import Student
from rest_framework import serializers
from .models import Teacher

class TeacherSerializer(serializers.ModelSerializer):

    class Meta:

        model = Teacher

        fields = "__all__"




class StudentSerializer(serializers.ModelSerializer):

    teacher_name =serializers.CharField(

        source="teacher.name",

        read_only=True

    )

    class Meta:

        model = Student

        fields = [

            "id",

            "name",

            "age",

            "teacher",

            "teacher_name"

        ]