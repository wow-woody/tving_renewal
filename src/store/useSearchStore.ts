import { create } from 'zustand';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface SearchResult {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  media_type: 'tv' | 'movie' | 'person';
  vote_average: number;
  known_for_department?: string;
  release_date?: string;
}

interface SearchStore {
  searchResults: SearchResult[];
  isSearching: boolean;
  onSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  isSearching: false,

  onSearch: async (query: string) => {
    if (!query || query.trim().length === 0) {
      set({ searchResults: [], isSearching: false });
      return;
    }

    try {
      set({ isSearching: true });

      // TMDB multi search API - TV와 Movie를 함께 검색
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=ko-KR&page=1&include_adult=false`
      );

      const data = await res.json();

      // TV, Movie, Person 결과 필터링
      interface TmdbSearchItem {
        id: number;
        title?: string;
        name?: string;
        poster_path: string | null;
        backdrop_path: string | null;
        profile_path?: string | null;
        overview: string;
        media_type: 'tv' | 'movie' | 'person';
        vote_average: number;
        known_for_department?: string;
        release_date?: string;
      }

      const filtered = (data.results as TmdbSearchItem[])
        .filter(
          (item) =>
            item.media_type === 'tv' || item.media_type === 'movie' || item.media_type === 'person'
        )
        .slice(0, 10) // 상위 10개만 표시
        .map((item) => ({
          id: item.id,
          title: item.title || item.name || '',
          name: item.name,
          poster_path: item.poster_path || item.profile_path || null,
          backdrop_path: item.backdrop_path,
          overview: item.overview || '',
          media_type: item.media_type as 'tv' | 'movie' | 'person',
          vote_average: item.vote_average || 0,
          known_for_department: item.known_for_department,
          release_date: item.release_date,
        }));

      set({ searchResults: filtered, isSearching: false });
    } catch (error) {
      console.error('Search error:', error);
      set({ searchResults: [], isSearching: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [], isSearching: false });
  },
}));
