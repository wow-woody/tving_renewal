import drama from '../../../data/Drama'
import anim from '../../../data/Anim'
import movie from '../../../data/Movie'
import enter from '../../../data/Enter'

import type { Content } from '../../../types/content'
import { RankScope } from '../../../types/enum'
import { SwiperSlide } from 'swiper/react'

import RankingSwiper from '../../RankingSwiper/RankingSwiper'
import RankingContentCard from '../../RankingContentCard/RankingContentCard'

import './TvingTop20.scss'


const TvingTop20 = () => {

    const all: Content[] = [...drama, ...anim, ...movie, ...enter];

    const top20 = all
        .filter((item) => item.rank?.[RankScope.TOP20] != null)
        .sort((a, b) => (a.rank?.[RankScope.TOP20] ?? 999) - (b.rank?.[RankScope.TOP20] ?? 999))
        .slice(0, 20);

    return (
        <RankingSwiper>
            {top20.map((item) => (
                <SwiperSlide key={String(item.id)}>
                    <RankingContentCard
                    item={item}
                    rankScope={RankScope.TOP20}/>
                </SwiperSlide>
            ))}
        </RankingSwiper>
    )
}

export default TvingTop20