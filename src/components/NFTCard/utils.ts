import { gql } from "@apollo/client";
import { ShoppingCartT } from "@/store/shoppingCart";
export const ADD_ITEM_TO_CART = `
  mutation AddItemToCart($cartId: Int!, $contract: String!, $identifier: String!) {
    addItemToCart(cartId: $cartId, contract: $contract,identifier: $identifier ) {
      id
      items {
        contract
        identifier
      }
    }
  }
`;

export const CREATE_CART = `
  mutation {
    createCart {
      id
    }
  }
`;

export const isInCart = (
  contract: string,
  identifier: string,
  cart: ShoppingCartT
) => {
  if (cart && cart.items && cart.items.length) {
    const isInCart = cart.items.find(
      (cartItem) =>
        cartItem.contract === contract && cartItem.identifier === identifier
    );
    return !!isInCart;
  }
};
