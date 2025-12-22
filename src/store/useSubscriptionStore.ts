import { create } from 'zustand';

interface SubscriptionSelectState {
    selectedItemId: string | null;
    setSelectedItemId: (id: string) => void;
    reset: () => void;
}

export const useSubscriptionStore = create<SubscriptionSelectState>((set) => ({
    selectedItemId: null,
    setSelectedItemId: (id) => set({ selectedItemId: id }),
    reset: () => set({ selectedItemId: null }),
}));
