
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTvSeriesStore } from '../../../store/useTvSeriesStore';
import '../DramaDetail/scss/DramaList.scss';
import SeasonEpisodeSwiper from './SeasonEpisodeSwiper';


export default function DramaDetailTving() {
	// (중복 선언 제거됨)
		const { id } = useParams<{ id: string }>();
		const {
			tvDetail,
			episodesBySeason,

			onFetchTvDetail,
			onFetchSeasons,
			onFetchEpisodes,
			onFetchTvVideos,
		} = useTvSeriesStore();


		const [selectedSeason, setSelectedSeason] = useState<number>(1);
		const [showSeasonMenu, setShowSeasonMenu] = useState(false);

		useEffect(() => {
			if (!id) return;
			onFetchTvDetail(id);
			onFetchSeasons(id);
			onFetchTvVideos(id);
		}, [id, onFetchTvDetail, onFetchSeasons, onFetchTvVideos]);

		useEffect(() => {
			if (!tvDetail?.seasons || !id) return;
			tvDetail.seasons.forEach((season) => {
				if (season.season_number > 0) {
					onFetchEpisodes(id, season.season_number);
				}
			});
		}, [tvDetail, id, onFetchEpisodes]);

		if (!tvDetail) return <div className="drama-detail-loading">로딩중...</div>;

		// 시즌/에피소드
		const seasons = tvDetail.seasons?.filter((s) => s.season_number > 0) || [];
		const episodes = episodesBySeason[selectedSeason] || [];

		// 출연진 (최대 8명)
		const cast = ((tvDetail as any).credits && Array.isArray((tvDetail as any).credits.cast)) ? (tvDetail as any).credits.cast.slice(0, 8) : [];
		// 비슷한 콘텐츠 (예시: tvDetail.similar)
		const similar = ((tvDetail as any).similar && Array.isArray((tvDetail as any).similar.results)) ? (tvDetail as any).similar.results.slice(0, 8) : [];


		return (
			<div className="drama-detail-tving">
				{/* 상단 비주얼 */}
				<div className="drama-visual">
					<div className="drama-visual-bg" style={{ backgroundImage: tvDetail.backdrop_path ? `url(https://image.tmdb.org/t/p/original${tvDetail.backdrop_path})` : undefined }} />
				</div>



				{/* 시즌/에피소드 */}
				<SeasonEpisodeSwiper
					tvDetail={tvDetail}
					episodes={episodes}
					seasons={seasons}
					selectedSeason={selectedSeason}
					setSelectedSeason={setSelectedSeason}
					showSeasonMenu={showSeasonMenu}
					setShowSeasonMenu={setShowSeasonMenu}
				/>



				{/* 비슷한 콘텐츠 */}
				{similar.length > 0 && (
					<div className="drama-similar-section">
						<h4>비슷한 콘텐츠</h4>
						<div className="similar-list">
							{similar.map((item: any) => (
								<div className="similar-card" key={item.id}>
									<img src={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : ''} alt={item.name} />
									<div className="similar-title">{item.name}</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* 출연진 */}
				{cast.length > 0 && (
					<div className="drama-cast-section">
						<h4>출연진</h4>
						<div className="cast-list">
							{cast.map((person: any) => (
								<div className="cast-card" key={person.id}>
									<img className="cast-img" src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : ''} alt={person.name} />
									<div className="cast-name">{person.name}</div>
									<div className="cast-role">{person.character}</div>
								</div>
							))}
						</div>
					</div>
				)}


			</div>
		);
};



