"use client";

import { useCallback } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { cn } from "@/styles/functions";
import { Cards } from "../components/albums/cards";
import type { AlbumCard } from "../models/album";
import repositories from "../repositories";

type Props = {
  data: AlbumCard[];
};

export const Albums = ({ data }: Props) => {
  const [open, toggle] = useToggle(false);

  const refresh = useCallback(async () => await repositories.albums.list(), []);

  return (
    <PullToRefresh>
      <Container>
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">アルバム一覧</Title>
          <Description>
            <p>大切な思い出の写真をアルバムでまとめています。</p>
            <p>アルバムをタップすると、中の写真を見ることができます。</p>
          </Description>
        </div>

        <Cards data={data} open={open} toggle={toggle} onRefresh={refresh} />
      </Container>
    </PullToRefresh>
  );
};
