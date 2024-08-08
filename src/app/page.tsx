import NFTCollectionsDashboard from "@/components/NFTCollectionsDashboard/NFTCollectionsDashboard";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <NFTCollectionsDashboard limit={12} />
    </main>
  );
}
