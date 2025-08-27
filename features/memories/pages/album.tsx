"use client";

import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { cn } from "@/styles/functions";
import { Cards } from "../components/pictures/cards";
import { albums, pictures } from "../mock";

type Props = {
  id: string;
};

export const Album = ({ id }: Props) => {
  const [open, toggle] = useToggle(false);

  /** 実際のデータからアルバムを取得 */
  const album = albums.find((album) => album.id === id);

  /** 実際のデータから写真を取得 */
  const picturesOfAlbum = pictures[id] || [];

  return (
    <PullToRefresh>
      <Container className="h-[calc(100%-4rem)] md:h-[calc(100%-4.5rem)]">
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">{album ? album.name : "アルバム"}</Title>
          {album && (
            <Description>
              <p>
                {album.count}
                枚の写真があります。
              </p>
              <p>写真をタップすると大きく表示されます。</p>
            </Description>
          )}
        </div>

        <div className="pb-20 md:pb-24 lg:pb-28">
          <Cards
            cards={picturesOfAlbum}
            albumId={id}
            open={open}
            toggle={toggle}
          />
        </div>
      </Container>
    </PullToRefresh>
  );
};
