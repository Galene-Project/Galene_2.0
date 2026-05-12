import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
  clear: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const items = get().items;
        const existingIndex = items.findIndex((i) => i.id === item.id);
        if (existingIndex !== -1) {
          const updatedItems = items.map((i, index) =>
            index === existingIndex ? { ...i, quantity: i.quantity + item.quantity } : i
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id: string, quantity: number) => {
        const items = get().items;
        const existingIndex = items.findIndex((i) => i.id === id);
        if (existingIndex !== -1) {
          if (quantity <= 0) {
            set({ items: items.filter((_, index) => index !== existingIndex) });
          } else {
            const updatedItems = items.map((i, index) =>
              index === existingIndex ? { ...i, quantity } : i
            );
            set({ items: updatedItems });
          }
        }
      },
      getTotal: () => get().items.reduce((acc: number, item) => acc + item.price * item.quantity, 0),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'galene-cart-storage',
    }
  )
);
