from django.db import models


class Teacher(models.Model):

    name = models.CharField(max_length=20)

    subject = models.CharField(max_length=20)

    def __str__(self):
        return self.name



class Student(models.Model):

    teacher=models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE
       )
    name = models.CharField(max_length=20)

    age = models.IntegerField()
    
    def __str__(self):
        return self.name