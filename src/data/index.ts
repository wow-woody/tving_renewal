// src/data/index.ts
import Drama from "./Drama";
import Enter from "./Enter";
import Anim from "./Anim";
import Movie from "./Movie";

import { TvingBadge } from "../type/enum";
import type { Content } from "../type/content";

/** 모든 콘텐츠 */
export const ALL_CONTENTS: Content[] = [
  ...Drama,
  ...Enter,
  ...Anim,
  ...Movie,
];

/** TVING ORIGINAL */
export const ORIGINAL_CONTENTS: Content[] = ALL_CONTENTS.filter(
  (item) => item.badge === TvingBadge.ORIGINAL
);

/** TVING ONLY */
export const ONLY_CONTENTS: Content[] = ALL_CONTENTS.filter(
  (item) => item.badge === TvingBadge.ONLY
);
