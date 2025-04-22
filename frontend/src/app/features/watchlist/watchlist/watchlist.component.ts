import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Watchlist } from '../../../shared/models/watchlist.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class WatchlistComponent implements OnInit {
  watchlist: Watchlist[] = [];
  isLoggedIn: boolean = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (!loggedIn) {
          this.error = 'Please log in to view your watchlist';
          this.router.navigate(['/login']);
        } else {
          this.loadWatchlist();
        }
      },
      error: (err) => {
        console.error('Error checking login status:', err);
      }
    });
  }

  loadWatchlist() {
    this.apiService.getWatchlist().subscribe({
      next: (watchlist) => {
        this.watchlist = watchlist;
        this.error = null;
      },
      error: (err) => {
        this.error = err.status === 0 ? 'Backend is not responding' : 'Failed to load watchlist';
        console.error('Failed to load watchlist:', err);
      }
    });
  }

  removeFromWatchlist(id: number) {
    this.apiService.removeFromWatchlist(id).subscribe({
      next: () => {
        this.watchlist = this.watchlist.filter(item => item.id !== id);
        this.error = null;
      },
      error: (err) => {
        this.error = 'Failed to remove from watchlist';
        console.error('Failed to remove from watchlist:', err);
      }
    });
  }
}