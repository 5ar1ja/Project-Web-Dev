# api/migrations/0002_create_default_genres.py
from django.db import migrations

def create_default_genres(apps, schema_editor):
    Genre = apps.get_model('api', 'Genre')
    genres = [
        'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Thriller',
        'Romance', 'Adventure', 'Fantasy', 'Mystery', 'Crime', 'Family'
    ]
    for genre_name in genres:
        Genre.objects.create(name=genre_name)

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_genres),
    ]