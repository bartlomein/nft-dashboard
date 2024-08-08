import SingleCollection from "@/components/SingleCollection/SingleCollection";
import React from "react";

type CollectionPageP = {
  params: {
    collection: string;
  };
};

const CollectionPage = ({ params }: CollectionPageP) => {
  const collection = params?.collection;

  return (
    <div>
      <SingleCollection slug={collection} />
    </div>
  );
};

export default CollectionPage;
