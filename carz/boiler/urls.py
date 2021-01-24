from django.urls import path
from . import views

urlpatterns = [
    path('api/license',views.api_license),
    path('api/image', views.api_image),

    path('', views.serve('homepage.html')),

    path('test/', views.serve('testpage.html')),
    path('try/', views.serve('homepage.html')),
    path('try/automatic/', views.serve('imginput.html')),
    path('try/manual/', views.serve('input.html')),
]