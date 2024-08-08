export type AddItemToCartData = {
  addItemToCart: AddItemToCart;
};

export type AddItemToCart = {
  id: number;
  items: Item[];
};

export type Item = {
  contract: string;
  identifier: string;
};

export interface CreateCartData {
  createCart: CreateCart;
}

export interface CreateCart {
  id: number;
}
