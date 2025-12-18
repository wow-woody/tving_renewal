import {ALL_CONTENTS} from "../../data/index"; 
import { Category } from "../../type/enum";
import type { Content } from "../../type/content";

export const getEnterContents = (): Content[] => {
  return ALL_CONTENTS.filter(
    (item) => item.category === Category.ENTER
  );
};
