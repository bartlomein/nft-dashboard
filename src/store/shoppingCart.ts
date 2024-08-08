import { create } from "zustand";

type CartItem = {
  contract: string;
  identifier: string;
};

type ShoppingCartT = {
  id: number;
  items: CartItem[];
};

export const useCreatingCartStore = create<ShoppingCartT | null>(() => null);
