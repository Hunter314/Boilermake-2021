from django.urls import path
from . import views

urlpatterns = [
    path('api/license',views.api_license),
    path('try/manual/',views.serve('input.html')),
    path('', views.serve('homepage.html')),

    path('test/', views.serve('testpage.html')),
    path('try/', views.serve('try.html')),
    path('try/automatic/', views.serve('imginput.html')),
]