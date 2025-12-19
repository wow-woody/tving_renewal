import Drama from '../../data/Drama';
import { TMDB_GENRE_MAP } from '../../data/tmdbGenreMap';
import { useTvSeriesStore } from '../useTvSeriesStore';

type Source = 'all' | 'kr';

export const useMergeDrama = (source: Source = 'all') => {
  const { tvs, koTvs } = useTvSeriesStore();
  const tmdbList = source === 'kr' ? koTvs : tvs;

  return Drama.map((local) => {
    const tmdb = tmdbList.find((t) => t.name === local.title || t.original_name === local.title);

    const tmdbGenreKey = tmdb?.genre_ids?.map((id) => TMDB_GENRE_MAP[id]).filter(Boolean);

    return {
      ...local,
      tmdbId: tmdb?.id,
      poster: tmdb?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : local.img1,
      backdrop: tmdb?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${tmdb.backdrop_path}`
        : local.img2,
      overview: tmdb?.overview ?? local.desc,
      genreKey: local.genreKey ?? tmdbGenreKey,
      isTmdb: Boolean(tmdb),
    };
  });
};
