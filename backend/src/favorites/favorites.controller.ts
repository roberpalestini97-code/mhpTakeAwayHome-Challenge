import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post()
  add(@Body() movie: any) {
    // movie = { imdbID, Title, Year, Poster }
    return this.favoritesService.add(movie);
  }

  @Delete(':id')
  remove(@Param('id') imdbID: string) {
    return this.favoritesService.remove(imdbID);
  }
}
