import { create } from 'zustand';

type CategoryKey = 'all' | 'kr' | 'tving' | string;

interface DramaCate {
  category: CategoryKey;
  setCategory: (key: CategoryKey) => void;
}

export const useDramaCate = create<DramaCate>((set) => ({
  category: 'all',

  setCategory: (key) => set({ category: key }),
}));
