import { create } from 'zustand';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface PersonDetail {
    id: number;
    name: string;
    biography: string;
    profile_path: string | null;
    birthday: string | null;
    deathday: string | null;
    gender: number; // 0=Not set, 1=Female, 2=Male
    known_for_department: string;
    place_of_birth: string | null;
    popularity: number;
    also_known_as: string[];
}

export interface PersonCredits {
    cast: Array<{
        id: number;
        character: string;
        title?: string;
        name?: string;
        poster_path: string | null;
        release_date?: string;
        first_air_date?: string;
        media_type: 'tv' | 'movie';
    }>;
    crew: Array<{
        id: number;
        job: string;
        title?: string;
        name?: string;
        poster_path: string | null;
        release_date?: string;
        first_air_date?: string;
        media_type: 'tv' | 'movie';
    }>;
}

interface PersonStore {
    personDetail: PersonDetail | null;
    personCredits: PersonCredits | null;
    loading: boolean;
    onFetchPersonDetail: (id: number) => Promise<void>;
}

export const usePersonStore = create<PersonStore>((set) => ({
    personDetail: null,
    personCredits: null,
    loading: false,

    onFetchPersonDetail: async (id: number) => {
        try {
            set({ loading: true });

            // 출연진 상세 정보 + 크레딧 동시 요청
            const [detailRes, creditsRes] = await Promise.all([
                fetch(
                    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=ko-KR`
                ),
                fetch(
                    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=ko-KR`
                ),
            ]);

            const detailData = await detailRes.json();
            const creditsData = await creditsRes.json();

            // cast와 crew 데이터 정제
            const cast = creditsData.cast
                .filter((item: any) => item.poster_path)
                .sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0))
                .slice(0, 30)
                .map((item: any) => ({
                    id: item.id,
                    character: item.character || '',
                    title: item.title || item.name || '',
                    poster_path: item.poster_path,
                    release_date: item.release_date,
                    first_air_date: item.first_air_date,
                    media_type: item.media_type,
                }));

            const crew = creditsData.crew
                .filter(
                    (item: any) =>
                        item.poster_path &&
                        (item.job === 'Director' ||
                            item.job === 'Writer' ||
                            item.job === 'Producer')
                )
                .sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0))
                .slice(0, 20)
                .map((item: any) => ({
                    id: item.id,
                    job: item.job,
                    title: item.title || item.name || '',
                    poster_path: item.poster_path,
                    release_date: item.release_date,
                    first_air_date: item.first_air_date,
                    media_type: item.media_type,
                }));

            set({
                personDetail: {
                    id: detailData.id,
                    name: detailData.name,
                    biography: detailData.biography,
                    profile_path: detailData.profile_path,
                    birthday: detailData.birthday,
                    deathday: detailData.deathday,
                    gender: detailData.gender,
                    known_for_department: detailData.known_for_department,
                    place_of_birth: detailData.place_of_birth,
                    popularity: detailData.popularity,
                    also_known_as: detailData.also_known_as || [],
                },
                personCredits: { cast, crew },
                loading: false,
            });
        } catch (error) {
            console.error('Failed to fetch person detail:', error);
            set({ loading: false });
        }
    },
}));
