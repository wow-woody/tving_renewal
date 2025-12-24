// TVING 배지 (const object + union type)
export const TvingBadge = {
  ONLY: 'ONLY',
  ORIGINAL: 'ORIGINAL',
} as const;
export type TvingBadge = typeof TvingBadge[keyof typeof TvingBadge];

// 연령 등급
export const AgeRating = {
  ALL: 'ALL',
  AGE_7: '7',
  AGE_12: '12',
  AGE_15: '15',
  AGE_19: '19',
} as const;
export type AgeRating = typeof AgeRating[keyof typeof AgeRating];

// 카테고리
export const Category = {
  DRAMA: '드라마',
  ENTER: '예능',
  ANIM: '애니',
  MOVIE: '영화',
} as const;
export type Category = typeof Category[keyof typeof Category];

// 랭킹 기준
export const RankScope = {
  TOP20: 'TOP20',
  TVING_ONLY: 'TVING_ONLY',
  APPLE_TV: 'APPLE_TV',
  POP_ANIM: 'POP_ANIM',
  POP_DRAMA: 'POP_DRAMA',
  POP_ENTER: 'POP_ENTER',
} as const;
export type RankScope = typeof RankScope[keyof typeof RankScope];

export const Genre = {
  ROMANCE: '로맨스',
  THRILLER: '스릴러',
  DRAMA: '드라마',
  COMEDY: '코미디',
  ACTION: '액션',
  HORROR: '공포',
} as const;
export type Genre = typeof Genre[keyof typeof Genre];
