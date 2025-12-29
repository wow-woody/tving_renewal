import VOriginalCard from "./HilightsVOriginalCard";
import Highlights from "../../Highlights/Highlights";

import { ORIGINAL_CONTENTS } from "../../../data/index";
import { TVING_BADGE } from "../../../contents/media";
import { TvingBadge, Category } from "../../../types/enum";

interface Props {
    category?: Category;
}

const HilightsVOriginal = ({ category }: Props) => {
    const badge = TVING_BADGE[TvingBadge.ORIGINAL];

    const filteredContents = category
        ? ORIGINAL_CONTENTS.filter(item => item.category === category)
        : ORIGINAL_CONTENTS;

    return (
        <Highlights
            config={{
                logoUrl: badge.image,
                description: "티빙만의 특별한 오리지널 콘텐츠를 만나보세요.", // 줄바꿈이 필요하면 <br/>를 포함한 ReactNode로 타입 변경 추천
                bgType: 'image', // 오리지널 섹션이 단색 배경이라면
                bgValue: 'linear-gradient(295deg, rgba(255, 21, 60, 0.5) -42.62%, rgba(255, 21, 60, 0.4) -25.5%, rgba(255, 21, 60, 0.3) -8.39%, rgba(255, 21, 60, 0.1) 8.73%, rgba(255, 21, 60, 0.2) 25.84%, rgba(255, 21, 60, 0.3) 42.95%, rgba(255, 21, 60, 0.4) 60.07%, rgba(255, 21, 60, 0.5) 77.18%, rgba(255, 21, 60, 0.4) 100%)', // 배경색 지정
                slidesPerView: 4.5,
                spaceBetween: 24,
            }}
            contents={filteredContents}
            contentCards={(item: any) => <VOriginalCard item={item} />}
        />
    );
};

export default HilightsVOriginal;