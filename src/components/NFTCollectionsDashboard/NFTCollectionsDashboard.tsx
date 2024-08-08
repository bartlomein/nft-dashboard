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
    return <div>ERROR</div>;
  }
  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      {data.collections.map((collection: DashboardItemT, index: number) => (
        <DashboardItem
          key={index}
          name={collection.name}
          collection={collection.collection}
        />
      ))}
    </div>
  );
};

export default NFTCollectionsDashboard;
