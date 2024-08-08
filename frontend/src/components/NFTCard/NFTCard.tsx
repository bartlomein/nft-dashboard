import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { ADD_ITEM_TO_CART, CREATE_CART, isInCart } from "./utils";
import { useMutation } from "@tanstack/react-query";

import request from "graphql-request";
import { useShoppingCartStore } from "@/store/shoppingCart";
import { AddItemToCartData, CreateCartData } from "./types";
import { API } from "@/api/utils";

type NFTCardP = {
  identifier: string;
  contract: string;
  cartId: number | null;
  image_url: string;
  height: number;
  width: number;
  setCartId: (id: number) => void;
};

const NFTCard = ({
  identifier,
  contract,
  cartId,
  setCartId,
  height,
  width,
  image_url,
}: NFTCardP) => {
  const cart = useShoppingCartStore();

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
        useShoppingCartStore.setState({
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

  const addToCart = useCallback(async () => {
    if (!cartId) {
      const data = await createCart.mutateAsync();
      const id = data.createCart.id;
      if (id) {
        addItem.mutate(id);
      }
      return;
    }

    addItem.mutate(cartId);
  }, [cartId, addItem, createCart]);

  const disabled = useMemo(
    () => isInCart(contract, identifier, cart),
    [contract, identifier, cart]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{identifier}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          className="flex cursor-pointer rounded-md justify-center align-center"
          style={{
            position: "relative",
            height: height,
            maxWidth: width,
            width: "100%",
          }}
        >
          <Image
            src={image_url}
            sizes={`${width}px`}
            fill
            alt={identifier?.[1]}
            style={{ objectFit: "cover" }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex align-center justify-center">
        <Button onClick={() => addToCart()} disabled={disabled}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
