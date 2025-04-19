from rest_framework import serializers
from .models import Movie, Review, Watchlist
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class MovieSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_year', 'genre', 'created_by']
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())
    class Meta:
        model = Review
        fields = ['id', 'movie', 'user', 'content', 'rating', 'created_at']
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class WatchlistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())
    class Meta:
        model = Watchlist
        fields = ['id', 'user', 'movie']
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)