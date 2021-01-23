from django.urls import path
from . import views

urlpatterns = [
    path('api/license',views.api_license),
    path("",views.serve("input.html"))
]