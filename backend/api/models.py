from django.db import models
from django.contrib.auth.models import User

class MovieManager(models.Manager):
    def by_genre(self, genre_name):
        return self.filter(genre__name=genre_name)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_year = models.IntegerField()
    genre = models.ForeignKey('Genre', on_delete=models.CASCADE, related_name='movies')
    poster = models.ImageField(upload_to='posters/', null=True, blank=True) 
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='movies')

    objects = MovieManager()

    def __str__(self):
        return self.title

class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name