import RankRow from "./RankRowanim20";
import { ALL_CONTENTS } from "../../data/index";
import { RankScope } from "../../types/enum";

const AnimPop20 = () => {
  const popAnim20 = ALL_CONTENTS
    .filter((item) => item.rank?.[RankScope.POP_ANIM])
    .sort((a, b) => (a.rank?.[RankScope.POP_ANIM] ?? 999) - (b.rank?.[RankScope.POP_ANIM] ?? 999))
    .slice(0, 20);

  return <RankRow title="실시간 인기 애니메이션" data={popAnim20} rankScope={RankScope.POP_ANIM} />;
};

export default AnimPop20;
