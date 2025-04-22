// src/app/shared/models/movie.model.ts
export interface Movie {
  id: number;
  title: string;
  description: string;
  release_year: number;
  poster?: string; // Меняем image на poster, как в бэкенде
  created_by: { id: number; username: string };
  genre: { id: number; name: string };
}