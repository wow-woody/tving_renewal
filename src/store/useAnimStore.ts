import { create } from 'zustand';
import type { TV } from '../type/contents';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface AnimDetail {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  age?: string;
  logo: string | null;
  backdrop: string | null;
  directors: string[];
  casts: string[];
  genreNames: string[];
  networks: any[];
  seasonText: string;
  adult?: boolean;
  genres?: any[];
  number_of_seasons?: number;
}

interface AnimStore {
  anims: TV[];
  filteredAnims: TV[];
  animDetail: AnimDetail | null;
  episodes: any[];
  videos: any[];
  seasons: any[];

  onFetchAnims: () => Promise<void>;
  onFetchAnimByFilter: (params: Record<string, string>) => Promise<void>;
  onFetchAnimDetail: (id: string) => Promise<void>;
  onFetchSeasons: (id: string) => Promise<void>;
  onFetchEpisodes: (id: string, season: number) => Promise<void>;
  onFetchAnimVideos: (id: string) => Promise<void>;
}

export const useAnimStore = create<AnimStore>((set) => ({
  anims: [],
  filteredAnims: [],
  animDetail: null,
  episodes: [],
  videos: [],
  seasons: [],

  // 애니메이션 가져오기
  onFetchAnims: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    set({ anims: data.results });
  },

  // 애니메이션 필터링
  onFetchAnimByFilter: async (params) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?${new URLSearchParams({
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        with_genres: '16',
        ...params,
      })}`
    );

    const data = await res.json();
    set({ filteredAnims: data.results });
  },

  // 애니메이션 상세 정보
  onFetchAnimDetail: async (id: string) => {
    try {
      const [resDetail, resImg, resAge, resCredits] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`),
      ]);

      const detail = await resDetail.json();
      const img = await resImg.json();
      const ageData = await resAge.json();
      const credits = await resCredits.json();

      const logo =
        img.logos?.find((l: any) => l.iso_639_1 === 'ko') ||
        img.logos?.find((l: any) => l.iso_639_1 === 'ja') ||
        img.logos?.find((l: any) => l.iso_639_1 === 'en') ||
        img.logos?.[0] ||
        null;

      const backdrop =
        img.backdrops?.find((b: any) => b.iso_639_1 === null) || img.backdrops?.[0] || null;

      const krAge = ageData.results?.find((r: any) => r.iso_3166_1 === 'KR')?.rating;
      const genreNames = detail.genres?.map((g: any) => g.name) || [];
      const networks = detail.networks || [];
      const seasonText =
        detail.number_of_seasons === 1
          ? '시즌 1'
          : detail.number_of_seasons
          ? `시즌 ${detail.number_of_seasons}`
          : '';

      const directors =
        credits.crew
          ?.filter((c: any) => c.job === 'Director' || c.job === 'Executive Producer')
          .map((d: any) => d.name) || [];

      const casts = credits.cast?.slice(0, 8).map((c: any) => c.name) || [];

      set({
        animDetail: {
          ...detail,
          age: krAge || (detail.adult ? '19' : '12'),
          logo: logo?.file_path || null,
          backdrop: backdrop?.file_path || detail.backdrop_path,
          directors,
          casts,
          genreNames,
          networks,
          seasonText,
        },
      });
    } catch (error) {
      console.error('Anim Detail Fetch Error', error);
      set({ animDetail: null });
    }
  },

  // 시즌 정보
  onFetchSeasons: async (id: string) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`);
    const data = await res.json();
    set({ seasons: data.seasons || [] });
  },

  // 에피소드 정보
  onFetchEpisodes: async (id: string, season: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=ko-KR`
    );
    const data = await res.json();
    set({ episodes: data.episodes || [] });
  },

  // 비디오 정보
  onFetchAnimVideos: async (id) => {
    const koRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    );
    const koData = await koRes.json();

    if (koData.results?.length > 0) {
      set({ videos: koData.results });
      return;
    }

    // 일본어 fallback
    const jaRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=ja-JP`
    );
    const jaData = await jaRes.json();

    if (jaData.results?.length > 0) {
      set({ videos: jaData.results });
      return;
    }

    // 영어 fallback
    const enRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const enData = await enRes.json();
    set({ videos: enData.results || [] });
  },
}));
