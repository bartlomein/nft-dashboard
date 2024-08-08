import NFTCollectionsDashboard from "@/components/NFTCollectionsDashboard/NFTCollectionsDashboard";

export default function Home() {
  return (
    <main>
      <NFTCollectionsDashboard limit={12} />
    </main>
  );
}
