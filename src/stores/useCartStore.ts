import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
  clear: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const { items } = get();
        const existingIndex = items.findIndex((item) => item.id === newItem.id);
        if (existingIndex !== -1) {
          const updatedItems = items.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: item.quantity + (newItem.quantity || 1),
                }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({
            items: [
              ...items,
              {
                ...newItem,
                quantity: newItem.quantity || 1,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        const { items } = get();
        const updatedItems = items
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);
        set({ items: updatedItems });
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'galene-cart-storage',
    }
  )
);

export default useCartStore;
