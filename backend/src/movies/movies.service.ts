import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly API_URL = 'https://www.omdbapi.com/';
  private readonly API_KEY = '64f915f5' // ⚠️ tenés que setear esto en .env

  async searchMovies(query: string) {
    try {
      if (!query) return [];

      const res = await axios.get(this.API_URL, {
        params: {
          s: query,
          apikey: this.API_KEY,
        },
      });

      // OMDb devuelve { Response: "False", Error: "..."} cuando no encuentra nada
      if (res.data.Response === 'False') {
        return [];
      }

      return res.data.Search.map((m) => ({
        imdbID: m.imdbID,
        Title: m.Title,
        Year: m.Year,
        Poster: m.Poster,
      }));
    } catch (err) {
      console.error('OMDb API error:', err.response?.data || err.message);
      throw new InternalServerErrorException('Error fetching movies');
    }
  }
}
