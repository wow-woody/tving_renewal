import { useDramaCate } from './useDramaCate';
import { useMergeDrama } from './useMergeDrama';

export const useDramaList = () => {
  const category = useDramaCate((s) => s.category);

  const mergedAll = useMergeDrama('all');
  const mergedKr = useMergeDrama('kr');

  console.log('category', category);
  console.log('mergedAll', mergedAll);

  if (category === 'all') return mergedAll;
  if (category === 'kr' || category === 'tving') return mergedKr;

  return mergedAll.filter((d) => d.genreKey?.includes(category));
};
