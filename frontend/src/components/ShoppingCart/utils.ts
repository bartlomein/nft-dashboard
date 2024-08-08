export const REMOVE_ITEM_FROM_CART = `
  mutation AddItemToCart($cartId: Int!, $identifier: String!) {
    removeItemFromCart(cartId: $cartId, identifier: $identifier) {
      id
      items {
        contract
        identifier
      }
    }
  }
`;

export const GET_CART = `
  query GetCart($cartId: Int!) {
    getCart(cartId: $cartId) {
      items {
        contract
        identifier
      }
    }
  }
`;
