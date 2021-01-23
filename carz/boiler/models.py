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

import pandas as pd
