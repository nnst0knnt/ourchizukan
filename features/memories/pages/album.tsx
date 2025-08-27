"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { cn } from "@/styles/functions";
import { Cards } from "../components/pictures/cards";
import type { AlbumDescription } from "../models/album";
import type { PictureCard } from "../models/picture";
import repositories from "../repositories";

type Props = {
  id: string;
};

export const Album = ({ id }: Props) => {
  const [open, toggle] = useToggle(false);
  const [album, setAlbum] = useState<AlbumDescription | null>(null);
  const [pictures, setPictures] = useState<PictureCard[]>();

  const fetch = useCallback(async () => {
    const [album, pictures] = await Promise.all([
      repositories.albums.get({ id }),
      repositories.pictures.list({ albumId: id }),
    ]);

    setAlbum(album);
    setPictures(pictures);
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return !!album && pictures !== undefined ? (
    <PullToRefresh>
      <Container className="h-[calc(100%-4rem)] md:h-[calc(100%-4.5rem)]">
        <div
          className={cn(
            "flex min-h-[115px] flex-col gap-4",
            open ? "hidden" : "flex",
          )}
        >
          <Title as="h1">{album.title}</Title>
          <Description>
            <p className="flex items-center gap-x-1">
              {pictures.length}枚の写真があります。
            </p>
            <p>写真をタップすると大きく表示されます。</p>
          </Description>
        </div>

        <div className="pb-20 md:pb-24 lg:pb-28">
          <Cards
            data={pictures}
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
