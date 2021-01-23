from django.conf import settings
import os

from openpyxl.utils.exceptions import InvalidFileException

workpath = os.path.dirname(os.path.abspath(__file__))
from django.core.management.base import BaseCommand
from .models import Car
import openpyxl
# from models import Car
import csv
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile

# 'CMYT_CO_FE_MSR', 'CMYT_CO2_FE_MSR', 'CMYT_NOX_MSR'
co2_titles = ["CO2 (g/mi)", "CMYT_CO2_FE_MSR"]
co_titles = ["CO (g/mi)", "CMYT_CO_FE_MSR"]
nox_titles = ["NOx (g/mi)", "CMYT_NOX_MSR"]
year_titles = ["Model Year", "MDLYR_DT"]
model_titles = ["Represented Test Veh Model", "CL_NM"]
make_titles = ["Represented Test Veh Make", "VI_MFR_NM"]
all_titles = {"year": year_titles,
              "model": model_titles,
              "make": make_titles,
              "co2": co2_titles,
              "co": co_titles,
              "nox": nox_titles,
              }
# List of all separate dfs to concatenate

def clear():
    Car.objects.all().delete()


def read(df):
    # df is an input dataframe
    # for all csv's, replace df with read_all_csvs()
    # for all xlsx, replace df with read_all_xlsx()

    #print(read_all_csvs())

    # test
    #row_iter = csv_reader.read_all_csvs().iterrows()
    row_iter = df.iterrows()

    objs = [

        Car(

            car_model = row["model"],

            make = row["make"],

            year = row["year"],

            co2  = row["co2"],

            co = row["co"],

            n2o = row["nox"]
        )

        for index, row in row_iter

    ]

    Car.objects.bulk_create(objs)

def read_all_csvs():
    all_dfs = []
    #for i in range(1,2):
    for i in range (1, 18):
        # print(i)
        #this_csv = pd.read_csv(open(os.path.join(workpath, "/boiler/csvs/year" + str(i) + ".csv"), 'rb'))
        this_csv = pd.read_csv("./boiler/csvs/year" + str(i) + ".csv")
        # print(this_csv.head())
        append_to_pandas(this_csv, all_dfs)
        print(all_dfs)
    print("Now concatenating!")
    result = pd.concat(all_dfs)
    # print(result)
    return(result)

def select_pandas(df):

# CO (g/mi)
    col_names = []
    for category in all_titles:
        print("Current category:" + category)
        found = False
        col_names.append()

        for title in all_titles[category]:

            print(title)
            if title in df.columns and found == False:
                # print(str(df.columns.get_loc(title)))
                col_names.append(title)
                found = True

        if (found == False):
            print("!!! Failed to find title in csv. !!!")
            print("Details:")
            print(list(df.columns))

    new = df[col_names].copy()
    return new

def read_all_xlsx():
    all_dfs = []
    for i in range(18, 22):
        try:
            this_xlsx = pd.read_excel("./boiler/csvs/year" + str(i) + ".xlsx", engine="openpyxl")
        except InvalidFileException:
            this_xlsx = pd.read_excel("./boiler/csvs/year" + str(i) + ".xlsx")
        # print(i)
        # this_csv = pd.read_csv(open(os.path.join(workpath, "/boiler/csvs/year" + str(i) + ".csv"), 'rb'))
        # print(this_csv.head())
        append_to_pandas(this_xlsx, all_dfs)

    try:
        result = pd.concat(all_dfs)
    except ValueError:
        for frame in all_dfs:
            print(frame.shape)
    # print(result)
    return (result)


def append_to_pandas(df, all_dfs):
# CO (g/mi)
    select_cols = []
    for category in all_titles:
        #print("Current category:" + category)
        found = False
        # Changed code below, uncomment if all goes wrong
        # Append the first title, which is the preferred title for large dataframe
        # select_cols.append(all_titles[category][0])
        select_cols.append(category)
        for title in all_titles[category]:

            #print(title)
            if title in df.columns:
                # print(str(df.columns.get_loc(title)))
                # col_names.append(title)
                  # if all_titles[category].index(title) != 0:

                df = df.rename(columns={title : category})
                found = True

        if (found == False):
            print("!!! Failed to find title in csv. !!!")
            print("Details:")
            print(list(df.columns))

    new = df[select_cols].copy()
    all_dfs.append(new)
    return new


def read_all():
    clear()
    read(read_all_csvs())
    read(read_all_xlsx())


def clean_df(df):
    # removes missing values and copies of make/model/year in database
    new = df