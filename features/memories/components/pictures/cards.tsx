import { Button } from "@/components/elements/trigger";
import { Title } from "@/components/elements/typography";
import { uuid } from "@/services/uuid";
import { ImageOff, Upload as UploadIcon } from "lucide-react";
import { Fragment, memo, useCallback, useMemo, useState } from "react";
import { useToggle } from "react-use";
import type { PictureCard } from "../../models/card";
import { Card } from "./card";
import { Upload } from "./upload";
import { Viewer } from "./viewer";

type CardsProps = {
  cards: PictureCard[];
  albumId?: string | null;
  loading?: boolean;
};

export const Cards = memo<CardsProps>(({ cards, albumId, loading }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [open, toggle] = useToggle(false);

  const hasNext = useMemo(
    () => cards && selected !== null && selected < cards.length - 1,
    [cards, selected],
  );

  const hasPrevious = useMemo(
    () => cards && selected !== null && selected > 0,
    [cards, selected],
  );

  const close = useCallback(() => setSelected(null), []);

  const next = useCallback(
    () => (hasNext && selected !== null ? setSelected(selected + 1) : null),
    [hasNext, selected],
  );

  const previous = useCallback(
    () => (hasPrevious && selected !== null ? setSelected(selected - 1) : null),
    [hasPrevious, selected],
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Title as="h2">写真一覧</Title>
        <Button onClick={toggle} mark={UploadIcon}>
          写真をアップロード
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array(12)
            .fill(0)
            .map(() => <Card key={uuid()} loading={true} />)
        ) : cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <Fragment key={card.id}>
              <Card model={card} onClick={() => setSelected(index)} />
              <Viewer
                model={card}
                onClose={close}
                onNext={hasNext ? next : undefined}
                onPrevious={hasPrevious ? previous : undefined}
                invisible={index !== selected}
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

      {open && <Upload albumId={albumId} onClose={toggle} />}
    </>
  );
});

Cards.displayName = "Cards";
