import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { MovieDetailComponent } from './features/movies/movie-detail/movie-detail.component';
import { MovieFormComponent } from './features/movies/movie-form/movie-form.component';
import { WatchlistComponent } from './features/watchlist/watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movie-form', component: MovieFormComponent },
  { path: 'movie-form/:id', component: MovieFormComponent },
  { path: 'watchlist', component: WatchlistComponent }
];