from django.urls import path
from analyzer import views

urlpatterns = [
    path('api/analyze/', views.analyze_resume, name='analyze-resume'),
]
