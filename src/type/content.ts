import type { AgeRating, Category, TvingBadge, RankScope, Genre } from './enum';

export interface Content<NId = number> {
  id: NId;
  title: string;

  img1: string;
  img2: string;
  titleimg: string;

  category: Category;

  badge?: TvingBadge;
  age?: AgeRating;

  rank?: Partial<Record<RankScope, number>>;

  year?: string;
  genre?: Genre;
  filterKey?: string;
  genreKey?: string[];
  time?: string;
  broadcast?: string;
  season?: string;
  subtitle?: string;
  director?: string;
  actor?: string;
  desc?: string;

  iframe?: {
    width: string;
    height: string;
    src: string;
    title: string;
    frameborder: string;
    allow: string;
    referrerpolicy: string;
    allowfullscreen: boolean;
  }[];
}
