"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { cn } from "@/styles/functions";
import { Cards } from "../components/pictures/cards";
import type { AlbumPictures } from "../models/album";
import repositories from "../repositories";

type Props = {
  id: string;
};

export const Album = ({ id }: Props) => {
  const [open, toggle] = useToggle(false);
  const [data, setData] = useState<AlbumPictures>();

  const fetch = useCallback(async () => {
    const [album, pictures] = await Promise.all([
      repositories.albums.get({ id }),
      repositories.pictures.list({ albumId: id }),
    ]);

    setData({
      ...album,
      cards: pictures,
    });
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return data ? (
    <PullToRefresh>
      <Container className="h-[calc(100%-4rem)] md:h-[calc(100%-4.5rem)]">
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">{data.title}</Title>
          <Description>
            <p className="flex items-center gap-x-1">
              {data.cards.length}枚の写真があります。
            </p>
            <p>写真をタップすると大きく表示されます。</p>
          </Description>
        </div>

        <div className="pb-20 md:pb-24 lg:pb-28">
          <Cards
            data={data.cards}
            albumId={id}
            open={open}
            toggle={toggle}
            onRefresh={fetch}
          />
        </div>
      </Container>
    </PullToRefresh>
  ) : (
    <Container>
      <LoaderCircle className="h-12 w-12 animate-spin self-center" />
    </Container>
  );
};
