from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, TeacherViewSet

router = DefaultRouter()
router.register('student', StudentViewSet, basename='student'),

router.register("teacher", TeacherViewSet)

urlpatterns = router.urls








# from django.urls import path
# from .views import student_list, student_detail, 
 
# urlpatterns = [
#     path("", student_list, name="student-list"),
#     path("<int:pk>/", student_detail, name="student-detail"),
# ]