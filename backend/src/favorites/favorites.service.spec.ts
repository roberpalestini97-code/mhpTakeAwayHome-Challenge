import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    service = new FavoritesService();
  });

  it('should start empty', () => {
    expect(service.getFavorites()).toEqual([]);
  });

  it('should add a favorite', () => {
    const movie = { imdbID: 'tt123', Title: 'Test Movie' };
    service.addFavorite(movie);
    expect(service.getFavorites()).toContainEqual(movie);
  });

  it('should not add duplicate favorites', () => {
    const movie = { imdbID: 'tt123', Title: 'Test Movie' };
    service.addFavorite(movie);
    service.addFavorite(movie);
    expect(service.getFavorites().length).toBe(1);
  });

  it('should remove a favorite', () => {
    const movie = { imdbID: 'tt456', Title: 'Remove Me' };
    service.addFavorite(movie);
    service.removeFavorite('tt456');
    expect(service.getFavorites().find((m) => m.imdbID === 'tt456')).toBeUndefined();
  });
});
