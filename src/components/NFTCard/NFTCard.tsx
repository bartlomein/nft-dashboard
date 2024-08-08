import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { ADD_ITEM_TO_CART, CREATE_CART } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/app/api/utils";
import request from "graphql-request";
import { useCreatingCartStore } from "@/store/shoppingCart";
import { AddItemToCartData, CreateCartData } from "./types";

type NFTCardP = {
  identifier: string;
  contract: string;
  cartId: number | null;
  setCartId: (id: number) => void;
};

const NFTCard = ({ identifier, contract, cartId, setCartId }: NFTCardP) => {
  const addItem = useMutation<AddItemToCartData, unknown, number>({
    mutationKey: ["cartId", "identifier"],
    mutationFn: async (id: number) =>
      request(API, ADD_ITEM_TO_CART, {
        cartId: id,
        contract: contract,
        identifier: identifier,
      }),
    onSuccess: (data) => {
      const items = data.addItemToCart.items;
      if (cartId) {
        useCreatingCartStore.setState({
          id: cartId,
          items,
        });
      }
    },
  });

  const createCart = useMutation<CreateCartData>({
    mutationKey: ["identifier"],
    mutationFn: async () => request(API, CREATE_CART),
    onSuccess: (data) => {
      const id = data?.createCart?.id;
      setCartId(id);
    },
  });

  const addToCart = async () => {
    if (!cartId) {
      const data = await createCart.mutateAsync();
      const id = data.createCart.id;
      if (id) {
        addItem.mutate(id);
      }
      return;
    }

    addItem.mutate(cartId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{identifier}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addToCart()}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
