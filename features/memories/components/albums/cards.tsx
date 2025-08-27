"use client";

import { Button } from "@/components/elements/trigger";
import { Covered } from "@/components/structures";
import { useScrollToTop } from "@/hooks";
import { uuid } from "@/services/uuid";
import { cn } from "@/styles/functions";
import { FolderOpen, FolderPlus } from "lucide-react";
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
  useScrollToTop();

  const [open, toggle] = useToggle(false);

  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
        <div className="flex justify-end">
          <Button onClick={toggle} mark={FolderPlus}>
            アルバムを作成
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array(8)
              .fill(0)
              .map(() => <Card key={uuid()} loading={true} />)
          ) : cards && cards.length > 0 ? (
            cards.map((card) => <Card key={card.id} model={card} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary">
              <FolderOpen className="h-12 w-12" />
              <p>アルバムがありません</p>
            </div>
          )}
        </div>
      </div>

      {open && (
        <Covered>
          <Create onClose={toggle} />
        </Covered>
      )}
    </div>
  );
});

Cards.displayName = "Cards";
