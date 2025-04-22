// src/app/features/movies/movie-list/movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.loading = true;
    this.apiService.getMovies().subscribe({
      next: (movies) => {
        console.log('Movies loaded:', movies); // Для отладки
        this.movies = movies;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err.status === 0 ? 'Backend is not responding' : 
                    err.error?.message || 'Failed to load movies';
        console.error('Failed to load movies', err);
        this.loading = false;
      }
    });
  }

  retryLoad() {
    this.error = null;
    this.loadMovies();
  }
}