import SingleCollection from "@/components/SingleCollection/SingleCollection";
import React from "react";

const CollectionPage = ({ params }) => {
  const collection = params?.collection;

  return (
    <div>
      <SingleCollection slug={collection} />
    </div>
  );
};

export default CollectionPage;
