import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDramaList } from '../../store/Drama/useDramaList';
import { useDramaCate } from '../../store/Drama/useDramaCate';

const DramaCate = () => {
  const { key } = useParams();
  const setCategory = useDramaCate((s) => s.setCategory);
  const dramaList = useDramaList();

  useEffect(() => {
    if (key) {
      setCategory(key);
    }
  }, [key, setCategory]);

  return (
    <div className="dramacate-wrap">
      <h2>{key === 'tving' ? 'TVING 드라마' : key}</h2>

      <ul className="dramacate-list">
        {dramaList.map((item) => (
          <li key={item.id}>
            <img src={item.poster} alt={item.title} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DramaCate;
