import { gql } from "@apollo/client";

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
