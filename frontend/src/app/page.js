'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import Link from 'next/link';

function useSearch(q) {
  return useQuery({
    queryKey: ['search', q],
    queryFn: async () => {
      if (!q) return [];
      const res = await api.get(`/movies/search?q=${encodeURIComponent(q)}`);
      return res.data;
    },
    enabled: !!q,
  });
}

function useFavorites() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/favorites');
      return res.data;
    },
  });

  const add = useMutation({
    mutationFn: async (imdbID) => {
      const res = await api.post('/favorites', { imdbID });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const remove = useMutation({
    mutationFn: async (imdbID) => {
      await api.delete(`/favorites/${imdbID}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  return { ...query, add, remove };
}

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [term, setTerm] = useState('');
  const { data: results = [], isFetching } = useSearch(term);
  const { data: favs = [], add, remove } = useFavorites();

  const favSet = new Set(favs.map((f) => f.imdbID));

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <h1>Movie Search</h1>
        <Link href="/favorites">Favorites ({favs?.length || 0})</Link>
      </header>

      <form onSubmit={(e) => { e.preventDefault(); setTerm(q); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {isFetching ? <p>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 180px)', gap: 12 }}>
            {results.map((m) => (
              <div key={m.imdbID} style={{ border: '1px solid #ddd', padding: 8 }}>
                <img src={m.Poster !== 'N/A' ? m.Poster : '/no-poster.png'} alt={m.Title} style={{ width: '100%', height: 250, objectFit: 'cover' }}/>
                <h3>{m.Title}</h3>
                <p>{m.Year}</p>
                {favSet.has(m.imdbID) ? (
                  <button onClick={() => remove.mutate(m.imdbID)}>Remove favorite</button>
                ) : (
                  <button onClick={() => add.mutate(m)}>Add favorite</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
