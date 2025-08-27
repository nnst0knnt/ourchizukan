import { uuid } from "@/services/uuid";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import type { AlbumCard } from "../../models/card";
import { Card } from "./card";

type CardsProps = {
  cards: AlbumCard[];
  loading?: boolean;
};

export const Cards = memo<CardsProps>(({ cards, loading }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {loading ? (
      Array(8)
        .fill(0)
        .map(() => <Card key={uuid()} loading={true} />)
    ) : cards && cards.length > 0 ? (
      cards.map((card) => (
        <Link href={`/albums/${card.id}`} key={card.id} className="block">
          <Card model={card} />
        </Link>
      ))
    ) : (
      <div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary">
        <FolderOpen className="h-12 w-12" />
        <p>アルバムがありません</p>
      </div>
    )}
  </div>
));

Cards.displayName = "Cards";
