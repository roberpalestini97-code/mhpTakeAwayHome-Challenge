import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private favorites: { imdbID: string; Title: string }[] = [];

  getFavorites() {
    return this.favorites;
  }

  addFavorite(movie: { imdbID: string; Title: string }) {
    const exists = this.favorites.find((f) => f.imdbID === movie.imdbID);
    if (!exists) {
      this.favorites.push(movie);
    }
    return movie;
  }

  removeFavorite(imdbID: string) {
    this.favorites = this.favorites.filter((f) => f.imdbID !== imdbID);
    return { removed: imdbID };
  }
}
