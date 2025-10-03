import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getFavorites();
  }

  @Post()
  add(@Body() movie: any) {
    // movie = { imdbID, Title, Year, Poster }
    return this.favoritesService.addFavorite(movie);
  }

  @Delete(':id')
  remove(@Param('id') imdbID: string) {
    return this.favoritesService.removeFavorite(imdbID);
  }
}
