import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, FavoritesService],
})
export class MoviesModule {}
