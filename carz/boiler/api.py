from django.shortcuts import render
from api_helper import status, process
from .models import Car
from api_models import CarSerializer


def license(request,license):
    if request.method == "POST":
        lic = request.POST['license']
        if not lic:
            return status(False, "missing required Field")
        #method that returns make,model, and year of car as dict
        data = process(lic)
        car = Car.objects.get(model__icontains=model,make__icontains=make,year=int(year))
        parsed = CarSerializer(car)
        return status(True, parsed.data)