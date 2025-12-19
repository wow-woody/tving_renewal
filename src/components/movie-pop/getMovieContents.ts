import type { Content } from '../../type/content';
import Movie from '../../data/Movie';

export const getMovieContents = (): Content[] => {
  return Movie;
};
