"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import useLocalStorage from "@/hooks/useLocalStorage";
import NFTCard from "../NFTCard/NFTCard";
import { NftT } from "./types";

const fetchNFTCollection = async (slug: string) => {
  const response = await fetch(
    `https://api.opensea.io/api/v2/collection/${slug}/nfts`,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_OPENSEA || "",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const CART_ID = "cart-id";

type SingleCollectionP = {
  slug: string;
};

const SingleCollection = ({ slug }: SingleCollectionP) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["nftCollections", slug],
    queryFn: () => fetchNFTCollection(slug),
  });

  const [cartId, setCartId] = useLocalStorage<null | number>(CART_ID, null);

  if (error) {
    return <div>ERROR</div>;
  }
  if (isLoading) {
    <div>LOADING</div>;
  }

  console.log("data", data);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data?.nfts.map((nft: NftT, index: number) => (
        <NFTCard
          key={index}
          identifier={nft.identifier}
          contract={nft.contract}
          cartId={cartId}
          setCartId={setCartId}
          image_url={nft.display_image_url}
          height={200}
          width={200}
        />
      ))}
    </div>
  );
};

export default SingleCollection;
