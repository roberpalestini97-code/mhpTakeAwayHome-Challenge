'use client';

import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';

export default function FavoritesPage() {
  const qc = useQueryClient();

  const { data: favs = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/favorites');
      return res.data;
    },
  });

  const remove = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/favorites/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Favorites</h1>
        <Link href="/">Back to search</Link>
      </header>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 220px)', gap: 12 }}>
        {favs.length === 0 && <p>No favorites yet.</p>}
        {favs.map((m) => (
          <div key={m.imdbID.imdbID} style={{ border: '1px solid #ddd', padding: 8 }}>
            <img src={m.imdbID.Poster !== 'N/A' ? m.imdbID.Poster : '/no-poster.png'} alt={m.imdbID.Title} style={{ width: '100%', height: 300, objectFit: 'cover' }}/>
            <h3>{m.imdbID.Title}</h3>
            <p>{m.imdbID.Year}</p>
            <button onClick={() => remove.mutate(m.imdbID)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
