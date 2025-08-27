"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { useInfinityScroll } from "@/hooks/use-infinity-scroll";
import { cn } from "@/styles/functions";
import { Cards } from "../components/albums/cards";
import type { AlbumCard } from "../models/album";
import repositories from "../repositories";

export const Albums = () => {
  const [open, toggle] = useToggle(false);

  const fetch = useCallback(async (offset: number, limit: number) => {
    return await repositories.albums.list({ offset, limit });
  }, []);

  const { data, loading, refresh, trigger } = useInfinityScroll<AlbumCard>({
    fetch,
  });

  return (
    <PullToRefresh onRefresh={refresh}>
      <Container>
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">アルバム一覧</Title>
          <Description>
            <p>大切な思い出の写真をアルバムでまとめています。</p>
            <p>アルバムをタップすると、中の写真を見ることができます。</p>
          </Description>
        </div>

        <Cards
          data={data}
          open={open}
          loading={loading}
          toggle={toggle}
          onRefresh={refresh}
        />
        {loading && (
          <LoaderCircle className="h-12 w-12 animate-spin self-center" />
        )}
        <div ref={trigger} className="h-4" />
      </Container>
    </PullToRefresh>
  );
};
