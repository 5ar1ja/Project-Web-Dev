import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { WatchlistComponent } from './watchlist/watchlist/watchlist.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieFormComponent,
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class FeaturesModule { }