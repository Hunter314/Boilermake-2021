from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .api_helper import status,process
from django.views.decorators.csrf import csrf_exempt
from .models import Car, Data
from .api_models import CarSerializer

def home(request):
# Create your views here.
    # y
    year = request.GET.get('y')
    make = request.GET.get('m')
    model = request.GET.get('mo')
    return HttpResponse("Hello world!" + year + ", " + make + ", " + model)

#serve function for static webpages
def serve(html):
    def query(request):
        return render(request,html)
    return query

#given a license it will return the cars data
@csrf_exempt
def api_license(request):
    #check if it is a post request
    if request.method == "POST":
        #determines if user entered license plate and state
        try:
            lice = request.POST['license']
            state = request.POST['state']
        except:
            return status(False,"missing required field")   
        #determines if license plate exists
        data = process(lice,state)
        if not data:
            return status(False,"license plate not found")
        #search database for car
        cars = Car.objects.filter(car_model__icontains=data['model'], make__icontains=data['make'],year=data['year']).all()
        if not cars:
            return status(False,"Car Not Found In Database")
        car = cars[0]
        car_data = CarSerializer(car)
        #returns data and slider info for each piece of data
        return status(True,{**car_data.data,"license":lice,
        "n2o-slider":Data.percent(car.n2o,"n2o"),
        "co2-slider":Data.percent(car.co2,"co2"),
        "co-slider":Data.percent(car.co,"co")})
    else:
        return status(False,"method forbidden")
        


