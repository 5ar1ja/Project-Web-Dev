// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../../shared/models/movie.model';
import { Watchlist } from '../../shared/models/watchlist.model';

export interface Review {
  id: number;
  movie: number;
  user: string;
  text: string;
  rating: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; // http://localhost:8000/api/

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}`); // Исправляем: /api/
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}${id}/`); // /api/<id>/
  }

  createMovie(movie: FormData): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}crud/`, movie);
  }

  updateMovie(id: number, movie: FormData): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}crud/${id}/`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}crud/${id}/`);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}reviews/`);
  }

  createReview(review: { movie: number; text: string; rating: number }): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}reviews/`, review);
  }

  getWatchlist(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(`${this.apiUrl}watchlist/`);
  }

  addToWatchlist(movieId: number): Observable<Watchlist> {
    return this.http.post<Watchlist>(`${this.apiUrl}watchlist/`, { movie: movieId });
  }

  removeFromWatchlist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}watchlist/${id}/`);
  }
}