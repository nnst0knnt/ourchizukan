import { uuid } from "@/services/uuid";
import { ImageOff } from "lucide-react";
import { Fragment, memo, useCallback, useMemo, useState } from "react";
import type { PictureCard } from "../../models/card";
import { Card } from "./card";
import { Viewer } from "./viewer";

type CardsProps = {
  cards: PictureCard[];
  loading?: boolean;
};

export const Cards = memo<CardsProps>(({ cards, loading }) => {
  const [index, setIndex] = useState<number | null>(null);

  const hasNext = useMemo(
    () => cards && index !== null && index < cards.length - 1,
    [cards, index],
  );

  const hasPrevious = useMemo(
    () => cards && index !== null && index > 0,
    [cards, index],
  );

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(
    () => (hasNext && index ? setIndex(index + 1) : null),
    [hasNext, index],
  );

  const previous = useCallback(
    () => (hasPrevious && index ? setIndex(index - 1) : null),
    [hasPrevious, index],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array(12)
            .fill(0)
            .map(() => <Card key={uuid()} loading={true} />)
        ) : cards && cards.length > 0 ? (
          cards.map((card, i) => (
            <Fragment key={card.id}>
              <Card model={card} onClick={() => setIndex(i)} />
              <Viewer
                model={card}
                onClose={close}
                onNext={hasNext ? next : undefined}
                onPrevious={hasPrevious ? previous : undefined}
                invisible={index !== i}
              />
            </Fragment>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary">
            <ImageOff className="h-12 w-12" />
            <p>写真がありません</p>
          </div>
        )}
      </div>
    </>
  );
});

Cards.displayName = "Cards";
