"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardItem from "./DashboardItem";
import { DashboardItemT } from "./types";

const fetchNFTCollections = async (limit: number) => {
  const response = await fetch(
    `https://api.opensea.io/api/v2/collections?limit=${limit}&offset=0&order_by=market_cap`,
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

type NFTDashboardT = {
  limit: number;
};

const NFTCollectionsDashboard = ({ limit }: NFTDashboardT) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["nftCollections", limit],
    queryFn: () => fetchNFTCollections(limit),
  });

  if (error) {
    return (
      <div className="text-xl text-red">ERROR {JSON.stringify(error)}</div>
    );
  }
  if (isLoading) {
    return <div className="text-white text-xl">LOADING</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.collections.map((collection: DashboardItemT, index: number) => (
        <DashboardItem
          key={index}
          image_url={collection.image_url}
          name={collection.name}
          collection={collection.collection}
          height={200}
          width={200}
        />
      ))}
    </div>
  );
};

export default NFTCollectionsDashboard;
