import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private favorites: any[] = [];

  getAll() {
    console.log(this.favorites);
    return this.favorites;
  }

  add(movie: any) {
    const exists = this.favorites.find(f => f.imdbID === movie.imdbID);
    if (!exists) {
      // ✅ Guardamos la info completa de la película
      this.favorites.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
    }
    return this.favorites;
  }

  remove(imdbID: string) {
    const index = this.favorites.findIndex(f => f.imdbID === imdbID);
    if (index === -1) {
      throw new NotFoundException('Movie not in favorites');
    }
    this.favorites.splice(index, 1);
    return this.favorites;
  }
}
