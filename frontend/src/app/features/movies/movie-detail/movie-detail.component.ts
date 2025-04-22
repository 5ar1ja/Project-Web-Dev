import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe]
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  reviews: any[] = [];
  newReview: string = '';
  rating: number = 0;
  isLoggedIn: boolean = false;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loadReviews(id);
        this.error = null;
      },
      error: (err) => {
        this.handleError(err, 'Failed to load movie');
        this.loading = false;
      }
    });

    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
      },
      error: (err) => {
        console.error('Error checking login status:', err);
      }
    });
  }

  private loadReviews(movieId: number) {
    this.apiService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews.filter((review: any) => review.movie === movieId);
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err, 'Failed to load reviews');
        this.loading = false;
      }
    });
  }

  private handleError(err: any, defaultMessage: string) {
    this.error = err.status === 0 ? 'Backend is not responding' : 
                err.error?.message || defaultMessage;
    console.error(defaultMessage, err);
  }

  private checkPrerequisites(action: string): boolean {
    if (this.loading) {
      this.error = 'Data is still loading';
      return false;
    }
    if (!this.isLoggedIn) {
      this.error = `Please log in to ${action}`;
      return false;
    }
    if (!this.movie) {
      this.error = 'Movie data is not available';
      return false;
    }
    return true;
  }

  retryLoad() {
    this.error = null;
    this.loading = true;
    this.loadData();
  }

  addReview() {
    if (!this.checkPrerequisites('add a review')) return;
    if (!this.newReview.trim()) {
      this.error = 'Review text cannot be empty';
      return;
    }

    if (!this.movie || this.movie.id === undefined) {
      this.error = 'Movie data is not available';
      return;
    }

    const reviewData = { 
      movie: this.movie.id, 
      text: this.newReview,
      rating: this.rating || 0
    };

    this.apiService.createReview(reviewData).subscribe({
      next: (review) => {
        this.reviews.push(review);
        this.newReview = '';
        this.rating = 0;
        this.error = null;
      },
      error: (err) => {
        this.handleError(err, 'Failed to add review');
      }
    });
  }

  setRating(value: number) {
    this.rating = value;
  }

  addToWatchlist() {
    if (!this.checkPrerequisites('add to watchlist')) return;

    this.apiService.addToWatchlist(this.movie!.id).subscribe({
      next: () => {
        this.error = null;
        alert('Added to watchlist');
      },
      error: (err) => {
        this.handleError(err, 'Failed to add to watchlist');
      }
    });
  }

  editMovie() {
    if (!this.checkPrerequisites('edit the movie')) return;
    this.router.navigate(['/movie-form'], { 
      queryParams: { id: this.movie!.id } 
    });
  }

  deleteMovie() {
    if (!this.checkPrerequisites('delete the movie')) return;
  
    if (!this.movie) {
      this.error = 'Movie data is not available';
      return;
    }
  
    if (confirm('Are you sure you want to delete this movie?')) {
      this.apiService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.handleError(err, 'Failed to delete movie');
        }
      });
    }
  }
}