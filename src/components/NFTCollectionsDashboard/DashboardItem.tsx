import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type DashboardItemP = {
  name: string;
  collection: string;
  image_url: string;
  height: number;
  width: number;
};

const DashboardItem = ({
  name,
  collection,
  image_url,
  height,
  width,
}: DashboardItemP) => {
  return (
    <div>
      <Card>
        <Link href={`/collection/${collection}`}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div
              className="flex cursor-pointer rounded-md"
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
                alt={name}
                style={{ objectFit: "cover" }}
              />
            </div>
          </CardContent>
          <CardFooter>{name}</CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default DashboardItem;
