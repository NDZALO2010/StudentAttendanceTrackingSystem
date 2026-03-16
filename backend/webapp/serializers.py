from rest_framework import serializers
from .models import User, Student, Lecturer, Course, Enrollment, ClassSession, Attendance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'user_type']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['user', 'program', 'parent_email', 'parent_phone_num']


class LecturerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Lecturer
        fields = ['user', 'department']


class CourseSerializer(serializers.ModelSerializer):
    lecturer = LecturerSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['course_code', 'course_name', 'lecturer']


class ClassSessionSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    lecturer = LecturerSerializer(read_only=True)

    class Meta:
        model = ClassSession
        fields = [
            'id',
            'course',
            'lecturer',
            'day_of_week',
            'start_time',
            'end_time',
            'room',
        ]


class AttendanceSerializer(serializers.ModelSerializer):
    session = ClassSessionSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'session', 'date_time', 'status', 'image_data']


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrollment_date']
