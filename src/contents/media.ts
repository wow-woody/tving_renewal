import { TvingBadge, AgeRating } from '../type/enum';

/* TVING 배지 */
export const TVING_BADGE = {
  [TvingBadge.ONLY]: {
    image: '/images/v-o/v-only.svg',
    label: 'TVING ONLY',
  },
  [TvingBadge.ORIGINAL]: {
    image: '/images/v-o/v-origin.svg',
    label: 'V ORIGINAL',
  },
} as const;

/* 연령 등급 */
export const AGE = {
  [AgeRating.ALL]: {
    image: '/images/age/ageALL.svg',
    label: '전체 이용가',
  },
  [AgeRating.AGE_7]: {
    image: '/images/age/age7.svg',
    label: '7세 이상',
  },
  [AgeRating.AGE_12]: {
    image: '/images/age/age12.svg',
    label: '12세 이상',
  },
  [AgeRating.AGE_15]: {
    image: '/images/age/age15.svg',
    label: '15세 이상',
  },
  [AgeRating.AGE_19]: {
    image: '/images/age/age19.svg',
    label: '청소년 관람불가',
  },
} as const;
