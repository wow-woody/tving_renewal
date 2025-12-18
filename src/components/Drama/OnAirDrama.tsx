// src/components/OnAirDramaList.tsx
import { Link } from 'react-router-dom';

interface Tv {
  id: number;
  name: string;
  poster_path: string | null;
}

interface OnAirDramaListProps {
  tvs: Tv[];
}

const OnAirDramaList = ({ tvs }: OnAirDramaListProps) => {
  return (
    <section className="onair-section">
      <ul className="onair-list">
        {tvs.map((tv) => (
          <li key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              <div className="poster">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w342${tv.poster_path}`
                      : '/images/no-poster.png'
                  }
                  alt={tv.name}
                />
              </div>
              <p className="title">{tv.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OnAirDramaList;
