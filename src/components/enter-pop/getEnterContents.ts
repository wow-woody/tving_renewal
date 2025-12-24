import {ALL_CONTENTS} from "../../data/index"; 
import { Category } from "../../types/enum";
import type { Content } from "../../types/content";

export const getEnterContents = (): Content[] => {
  return ALL_CONTENTS.filter(
    (item) => item.category === Category.ENTER
  );
};
