import RankRow from "./RankRowtop20";
import { ALL_CONTENTS } from "../../data/index"; // index.ts에서 ALL_CONTENTS export 중 :contentReference[oaicite:6]{index=6}
import { RankScope } from "../../type/enum";

const TvingTop20 = () => {
  const tvingTop20 = ALL_CONTENTS
    .filter((item) => item.rank?.[RankScope.TOP20])
    .sort((a, b) => (a.rank?.[RankScope.TOP20] ?? 999) - (b.rank?.[RankScope.TOP20] ?? 999))
    .slice(0, 20);

  return <RankRow title="오늘의 티빙 TOP 20" data={tvingTop20} rankScope={RankScope.TOP20} />;
};

export default TvingTop20;
