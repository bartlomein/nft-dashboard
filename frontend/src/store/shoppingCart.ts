import { create } from "zustand";

type CartItem = {
  contract: string;
  identifier: string;
};

export type ShoppingCartT = {
  id: number;
  items: CartItem[];
};

export const useShoppingCartStore = create<ShoppingCartT | null>(() => null);
