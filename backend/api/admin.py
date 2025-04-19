from django.contrib import admin
from .models import Movie, Review, Watchlist, Genre

admin.site.register(Movie)
admin.site.register(Review)
admin.site.register(Watchlist)
admin.site.register(Genre)