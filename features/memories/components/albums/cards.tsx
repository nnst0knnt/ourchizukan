import { Button } from "@/components/elements/trigger";
import { Title } from "@/components/elements/typography";
import { uuid } from "@/services/uuid";
import { FolderOpen, FolderPlus } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { useToggle } from "react-use";
import type { AlbumCard } from "../../models/card";
import { Card } from "./card";
import { Create } from "./create";

type CardsProps = {
  cards: AlbumCard[];
  loading?: boolean;
};

export const Cards = memo<CardsProps>(({ cards, loading }) => {
  const [open, toggle] = useToggle(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Title as="h2">アルバム一覧</Title>
        <Button onClick={toggle} mark={FolderPlus}>
          新しいアルバム
        </Button>
      </div>

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

      {open && <Create onClose={toggle} />}
    </>
  );
});

Cards.displayName = "Cards";
