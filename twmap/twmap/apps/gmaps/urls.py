from django.contrib import admin
from django.urls import path
from twmap.apps.gmaps.views import *


urlpatterns = [
    path('', index),

]
