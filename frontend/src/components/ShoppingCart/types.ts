export type RemoveFromCartT = {
  removeItemFromCart: RemoveItemFromCart;
};

export type RemoveItemFromCart = {
  id: number;
  items: Item[];
};

export type Item = {
  contract: string;
  identifier: string;
};

export type GetCartData = {
  getCart: GetCart;
};

export type GetCart = {
  items: Item[];
};
