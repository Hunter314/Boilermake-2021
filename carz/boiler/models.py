from django.db import models
#from . import csv_reader
# Create your models here.
class Car(models.Model):
    def __str__(self):
        return "" + str(self.year) + str(self.car_model) + str(self.make)
    car_model = models.TextField(default = "")
    make = models.TextField(default = "")
    year = models.IntegerField(default = 0)
    #carbon dioxide
    co2 = models.FloatField(null = True,default = None)
    #carbon monoxide
    co = models.FloatField(null = True,default = None)
    #nitrous oxide
    n2o = models.FloatField(null = True,default = None)
#class to store statistical data of co2,co, and n2o
class Data(models.Model):
    name = models.TextField()
    iq3 = models.FloatField(default= 0)
    median = models.FloatField(default= 0)
    iq1 = models.FloatField(default= 0)
    average = models.FloatField(default= 0)
    maximum = models.FloatField(default= 0)
    minimum = models.FloatField(default= 0)
    def __str__(self):
        return self.name
    #returns range for slider
    def percent(value,field):
        if not value:
            return False
        data = Data.objects.get(name=field)
        path = "/static/images/"
        if value < data.iq1:
            return path + "wink.png"
        if value < data.median:
            return path + "meh.png"
        if value < data.iq3:
            return path + "sad.png"
        else:
            return path + "poop.png"
    #process data from cars
    def process():
        Data.process_data("co2")
        Data.process_data("co")
        Data.process_data("n2o")
    def process_data(title):
        #gets data object
        data, created = Data.objects.get_or_create(name=title)
        #gets all car objects in increasing order and excludes all blank values
        cars = Car.objects.order_by(title).exclude(**{title:None})
        #calculates median,iq1,iq3
        data.median = Data.gimmedata(len(cars)/2,cars,title)
        data.iq1 = Data.gimmedata(len(cars)/4,cars,title)
        data.iq3 = Data.gimmedata((len(cars)/4)*3,cars,title)
        summer = 0
        count = 0
        #get max and min since it's sorted it's pretty easy
        data.minimum = Data.gimmedata(0, cars, title)
        data.maximum = Data.gimmedata(len(cars)-1, cars, title)
        #calculates average
        for car in cars:
            attr = getattr(car,title)
            if attr:
                summer += attr
                count+=1
        data.average = summer/count
        data.save()
    def gimmedata(value, cars, attr):
        return getattr(cars[int(value)],attr)

import pandas as pd
