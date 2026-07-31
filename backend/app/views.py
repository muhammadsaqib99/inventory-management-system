from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.filters import OrderingFilter
from .models import Teacher
from .serializers import TeacherSerializer
# ModelViewSet

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend,
                       SearchFilter,
                       OrderingFilter
                       ]
    filterset_fields = ['age','teacher']
    search_fields = ['name','age']
    ordering_fields = ['name','age','teacher']


class TeacherViewSet(ModelViewSet):

    queryset = Teacher.objects.all()

    serializer_class = TeacherSerializer

    permission_classes = [AllowAny]

    filter_backends = [

        DjangoFilterBackend,

        SearchFilter,

        OrderingFilter

    ]

    search_fields = [

        "name",

        "subject"

    ]

    ordering_fields = [

        "name",

        "subject"

    ]


# API VIEW

# @api_view(["GET", "POST"])
# def student_list(request):

#     if request.method == "GET":

#         students = Student.objects.all()

#         serializer = StudentSerializer(students, many=True)

#         return Response(serializer.data)

#     elif request.method == "POST":

#         serializer = StudentSerializer(data=request.data)

#         if serializer.is_valid():

#             serializer.save()

#             return Response(
#                 serializer.data,
#                 status=status.HTTP_201_CREATED,
#             )

#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST,
#         )

# @api_view(["GET", "PUT", "DELETE"])

# def student_detail(request, pk):

#     try:
#         student = Student.objects.get(pk=pk)
#     except Student.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "GET":

#         serializer = StudentSerializer(student)

#         return Response(serializer.data)

#     elif request.method == "PUT":

#         serializer = StudentSerializer(student, data=request.data)

#         if serializer.is_valid():

#             serializer.save()

#             return Response(serializer.data)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == "DELETE":

#         student.delete()

#         return Response({"message": "Student deleted successfully."},status=status.HTTP_204_NO_CONTENT)







 # CBV

# class HomeView(View):

#     def get(self, request):
#         return render(request,"home.html")


# def home(request):
#     return render(request, "home.html")
