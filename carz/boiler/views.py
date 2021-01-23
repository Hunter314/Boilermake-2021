from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
# Create your views here.
    # y
    year = request.GET.get('y')
    make = request.GET.get('m')
    model = request.GET.get('mo')
    return HttpResponse("Hello world!" + year + ", " + make + ", " + model)

