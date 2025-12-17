import { create } from 'zustand';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useTvSeriesStore = create((set) => ({
  tvs: [],
  koTvs: [],
  onair: [],
  onairko: [],
  seasons: [],
  videos: [],

  // 드라마 장르
  onFetchTvs: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    // console.log('드라마', data.results);
    set({ tvs: data.results });
  },
  // 한국 드라마 장르
  onFetchKoTvs: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_original_language=ko&language=ko-KR&page=2`
    );
    const data = await res.json();
    // console.log('한국 드라마', data.results);
    set({ koTvs: data.results });
  },
  // 방영중인 드라마
  onFetchOnAir: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_status=0&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    // console.log('방영중', data.results);
    set({ onair: data.results });
  },
  // 방영중 한국 드라마
  onFetchOnAirKo: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18&with_status=0&with_original_language=ko&sort_by=popularity.desc&language=ko-KR`
    );
    const data = await res.json();
    console.log('한국방영중', data.results);
    set({ onairko: data.results });
  },

  //
  onFetchTvVideos: async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    console.log(data);
    set({ videos: data.results });
  },

  // 시리즈 시즌
  onFetchSeasons: async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    console.log('seasons', data);
    set({ seasons: data.seasons });
  },

  // 시즌 에피소드
  episodes: [],
  onFetchEpisodes: async (id, season) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    console.log('에피소드', data.episodes);
    set({ episodes: data.episodes });
  },
}));
