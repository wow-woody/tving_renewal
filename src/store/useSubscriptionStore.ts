import { create } from 'zustand';

interface SubscriptionSelectState {
  selectedItemId: string | null;
  selectItem: (id: string) => void;
  reset: () => void;
}

export const useSubscriptionStore = create<SubscriptionSelectState>((set) => ({
  selectedItemId: null,
  selectItem: (id) => set({ selectedItemId: id }),
  reset: () => set({ selectedItemId: null }),
}));