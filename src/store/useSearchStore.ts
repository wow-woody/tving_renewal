import { create } from 'zustand';
import Anim from '../data/Anim';
import Drama from '../data/Drama';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface SearchResult {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  media_type: 'tv' | 'movie' | 'person' | 'character';
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

      // TMDB multi search API - TV, Movie, Person
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=ko-KR&page=1&include_adult=false`
      );
      const data = await res.json();

      // TMDB 결과 정리
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
        .slice(0, 10)
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

      // 내부 애니/드라마 데이터에서 캐릭터명(actor)에 포함된 경우도 검색
      const lowerQuery = query.trim().toLowerCase();
      const animCharacterResults = Anim.filter(item =>
        item.actor && item.actor.split(',').some(name => name.trim().toLowerCase().includes(lowerQuery))
      ).map(item => ({
        id: item.id + 100000, // 내부 데이터와 TMDB id 충돌 방지
        title: item.title,
        name: query,
        poster_path: item.img1,
        backdrop_path: item.img2,
        overview: item.desc || '',
        media_type: 'character',
        vote_average: 0,
        known_for_department: '애니 캐릭터',
        release_date: item.year,
      }));

      const dramaCharacterResults = Drama.filter(item => {
        // actor, character 둘 다 검사
        const actorMatch = item.actor && item.actor.split(',').some(name => name.trim().toLowerCase().includes(lowerQuery));
        const characterMatch = item.character && item.character.split(',').some(name => name.trim().toLowerCase().includes(lowerQuery));
        return actorMatch || characterMatch;
      }).map(item => ({
        id: item.id + 200000, // 내부 데이터와 TMDB id 충돌 방지
        title: item.title,
        name: query,
        poster_path: item.img1,
        backdrop_path: item.img2,
        overview: item.desc || '',
        media_type: 'character',
        vote_average: 0,
        known_for_department: '드라마 캐릭터',
        release_date: item.year,
      }));

      // TMDB + 캐릭터명 결과 합치기
      const mergedResults = [...filtered, ...animCharacterResults, ...dramaCharacterResults];
      set({ searchResults: mergedResults, isSearching: false });
    } catch (error) {
      console.error('Search error:', error);
      set({ searchResults: [], isSearching: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [], isSearching: false });
  },
}));
