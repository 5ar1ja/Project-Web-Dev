// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router'; // Добавляем RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule] // Добавляем RouterModule
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Failed to check login status';
        console.error('Error checking login status:', err);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Logout failed';
        console.error('Logout failed:', err);
      }
    });
  }
}