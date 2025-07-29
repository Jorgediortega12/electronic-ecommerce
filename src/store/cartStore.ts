import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { items: [...state.items, item] };
    }),
  setItems: (items) => set({ items }),
  clearCart: () => set({ items: [] })
}));
