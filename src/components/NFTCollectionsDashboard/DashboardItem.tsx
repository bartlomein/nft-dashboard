import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";

const DashboardItem = ({ name, collection }) => {
  return (
    <div>
      <Card>{name}</Card>
      <Link href={`/collection/${collection}`}>{name}</Link>
    </div>
  );
};

export default DashboardItem;
