from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("car_model", "make","year")
    search_fields = ("car_model__icontains","make__icontains" )
    list_filter = ("year", )
# Register your models here.
