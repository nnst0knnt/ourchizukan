"use client";

import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { cn } from "@/styles/functions";
import { Cards } from "../components/albums/cards";
import { albums } from "../mock";

/**
 * Albums
 *
 * アルバム一覧を表示するページです。
 */
export const Albums = () => {
  const [open, toggle] = useToggle(false);

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

        <Cards cards={albums} open={open} toggle={toggle} />
      </Container>
    </PullToRefresh>
  );
};
