import { create } from "zustand";

export interface BagItemI {
  priceId: string;
  name: string;
  img: string;
  price: number;
  currency: string;
  description: string | null;
}

interface BagI {
  isOpened: boolean;
  setIsOpen: () => void;
  items: null | BagItemI[];
  totalCost: () => number;
  addItemToCart: (item: BagItemI) => void;
  removeItemFromCart: (priceId: string) => void;
}

export const useBagStore = create<BagI>((set, get) => ({
  isOpened: false,
  setIsOpen: () => set((state) => ({ isOpened: !state.isOpened })),
  items: null,
  totalCost: () => {
    const items = get().items;
    return items ? items.reduce((total, { price }) => total + price, 0) : 0;
  },
  addItemToCart: (item) =>
    set((state) => ({ items: state.items ? [...state.items, item] : [item] })),
  removeItemFromCart: (id) =>
    set((state) => {
      if (!Array.isArray(state.items)) return state;

      const filteredArray = state.items.filter((i) => i.priceId !== id);
      if (filteredArray.length) return { items: filteredArray };

      return { items: null };
    }),
}));
