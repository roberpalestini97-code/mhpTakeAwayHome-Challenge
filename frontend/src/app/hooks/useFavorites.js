'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export function useFavorites() {
  const qc = useQueryClient();

  const favorites = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/favorites');
      return res.data;
    },
  });

  const add = useMutation({
    mutationFn: async (movie) => {
      const res = await api.post('/favorites', movie);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const remove = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/favorites/${id}`);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  return { favorites, add, remove };
}
