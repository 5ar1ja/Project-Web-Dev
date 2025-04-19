"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import movie_list, movie_detail, MovieCRUD, ReviewList, WatchlistView, RegisterView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', movie_list, name='movie_list'),
    path('api/<int:pk>/', movie_detail, name='movie_detail'),
    path('api/crud/', MovieCRUD.as_view(), name='movie_create'),
    path('api/crud/<int:pk>/', MovieCRUD.as_view(), name='movie_crud'),
    path('api/reviews/', ReviewList.as_view(), name='review_list'),
    path('api/watchlist/', WatchlistView.as_view(), name='watchlist'),
    path('api/watchlist/<int:pk>/', WatchlistView.as_view(), name='watchlist_detail'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)