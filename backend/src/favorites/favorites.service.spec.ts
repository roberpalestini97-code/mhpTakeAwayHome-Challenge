import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    service = new FavoritesService();
  });

  it('should start empty', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should add a favorite', () => {
    const movie = { imdbID: 'tt123', Title: 'Test Movie' };
    service.add(movie);
    expect(service.getAll()).toContainEqual(movie);
  });

  it('should not add duplicate favorites', () => {
    const movie = { imdbID: 'tt123', Title: 'Test Movie' };
    service.add(movie);
    service.add(movie);
    expect(service.getAll().length).toBe(1);
  });

  it('should remove a favorite', () => {
    const movie = { imdbID: 'tt456', Title: 'Remove Me' };
    service.add(movie);
    service.remove('tt456');
    expect(service.getAll().find((m) => m.imdbID === 'tt456')).toBeUndefined();
  });
});
