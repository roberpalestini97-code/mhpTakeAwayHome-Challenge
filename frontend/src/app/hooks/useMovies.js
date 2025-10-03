"use client";
import { useQuery } from "@tanstack/react-query";

export function useMovies(query, page) {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: async () => {
      if (!query) return null;
      const res = await fetch(
        `http://localhost:4000/movies/search?q=${query}&page=${page}`
      );
      if (!res.ok) throw new Error("Error fetching movies");
      return res.json();
    },
    enabled: !!query,
  });
}
