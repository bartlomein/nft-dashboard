"use client";
import { useCreatingCartStore } from "@/store/shoppingCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { GET_CART, REMOVE_ITEM_FROM_CART } from "./utils";
import request from "graphql-request";
import { API } from "@/app/api/utils";
import { GetCartData, RemoveFromCartT } from "./types";
import useLocalStorage from "@/hooks/useLocalStorage";
const CART_ID = "cart-id";
const ShoppingCart = () => {
  const [localStorageId] = useLocalStorage<null | number>(CART_ID, null);
  const cart = useCreatingCartStore();
  const cartId = cart?.id;

  const { data } = useQuery<GetCartData>({
    queryKey: ["localStorageId"],
    queryFn: async () =>
      request(API, GET_CART, {
        cartId: localStorageId,
      }),
  });

  useEffect(() => {
    if (data && localStorageId) {
      useCreatingCartStore.setState({
        id: localStorageId,
        items: data.getCart.items,
      });
    }
  }, [data]);

  const removeItem = useMutation<RemoveFromCartT, unknown, number>({
    mutationFn: async (identifier) =>
      request(API, REMOVE_ITEM_FROM_CART, {
        cartId,
        identifier: identifier,
      }),
    onSuccess: (data) => {
      useCreatingCartStore.setState({
        id: data.removeItemFromCart.id,
        items: data.removeItemFromCart.items,
      });
    },
  });

  if (!cart) {
    return null;
  }
  return (
    <div className="absolute top-0 right-0 m-16">
      {cart.items &&
        cart.items.map((cartItem) => (
          <div>
            <div onClick={() => removeItem.mutate(cartItem.identifier as any)}>
              {cartItem.identifier}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCart;