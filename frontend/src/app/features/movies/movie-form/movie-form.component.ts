import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {
    id: 0, title: '', description: '', release_year: 0,
    created_by: {
      id: 0,
      username: ''
    },
    genre: {
      id: 0,
      name: ''
    }
  };
  imageFile: File | null = null;
  isEdit: boolean = false;
  isLoggedIn: boolean = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (!loggedIn) {
          this.error = 'Please log in to edit movies';
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error checking login status:', err);
      }
    });

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.apiService.getMovie(Number(id)).subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (err) => {
          this.error = 'Failed to load movie';
          console.error('Failed to load movie:', err);
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  saveMovie() {
    if (!this.isLoggedIn) {
      this.error = 'Please log in to save the movie';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.movie.title);
    formData.append('description', this.movie.description);
    formData.append('release_year', this.movie.release_year.toString());
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (this.isEdit) {
      this.apiService.updateMovie(this.movie.id, formData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.error = 'Failed to update movie';
          console.error('Failed to update movie:', err);
        }
      });
    } else {
      this.apiService.createMovie(formData).subscribe({
        next: () => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.error = 'Failed to create movie';
          console.error('Failed to create movie:', err);
        }
      });
    }
  }
}