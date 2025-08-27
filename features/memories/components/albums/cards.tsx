import { FolderOpen, FolderPlus, LoaderCircle } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/elements/trigger";
import { Covered } from "@/components/structures";
import { useScrollToTop } from "@/hooks";
import { cn } from "@/styles/functions";
import type { AlbumCard } from "../../models/album";
import { Card } from "./card";
import { Create } from "./create";

type CardsProps = {
  data: AlbumCard[] | undefined;
  open: boolean;
  toggle: () => void;
  onRefresh?: () => void;
};

export const Cards = memo<CardsProps>(({ data, open, toggle, onRefresh }) => {
  useScrollToTop();

  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
        <div className="flex justify-end">
          <Button onClick={toggle} mark={FolderPlus}>
            アルバムを作成
          </Button>
        </div>

        {data === undefined ? (
          <LoaderCircle className="size-10 animate-spin self-center" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data && data.length > 0 ? (
              data.map((datum) => <Card key={datum.id} datum={datum} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary">
                <FolderOpen className="h-12 w-12" />
                <p>アルバムがありません</p>
              </div>
            )}
          </div>
        )}
      </div>

      {open && (
        <Covered>
          <Create onClose={toggle} onSuccess={onRefresh} />
        </Covered>
      )}
    </div>
  );
});

Cards.displayName = "Cards";
