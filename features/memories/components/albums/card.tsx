import { useKeyboard } from "@/hooks";
import { cn } from "@/styles/functions";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import type { AlbumCard } from "../../models/card";

type CardProps = {
  album: AlbumCard;
};

export const Card = memo<CardProps>(({ album = null }) => {
  const router = useRouter();

  const click = useCallback(
    () => (album ? router.replace(`/albums/${album.id}`) : null),
    [album, router],
  );

  const { keydown } = useKeyboard({
    Enter: click,
  });

  useEffect(() => {
    if (album) {
      router.prefetch(`/albums/${album.id}`);
    }
  }, [album, router]);

  return (
    album && (
      <div
        className={cn(
          "relative flex w-full cursor-pointer flex-col overflow-hidden rounded-lg",
          "border border-outline bg-foundation shadow-sm transition-shadow duration-300 hover:shadow-md",
        )}
        role="link"
        onClick={click}
        onKeyDown={keydown}
        tabIndex={0}
        aria-label={`${album.name || "アルバム"}を開く`}
      >
        <div className="absolute inset-0 z-skeleton w-full overflow-hidden rounded-lg">
          <div className="aspect-square animate-pulse bg-primary/20" />
          <div className="p-4">
            <div className="mb-2 h-5 animate-pulse rounded bg-primary/20" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-primary/20" />
          </div>
        </div>
        <div className="relative z-content">
          <div className="relative aspect-square">
            {album.thumbnail ? (
              <Image
                src={album.thumbnail}
                alt={album.name || "アルバム"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-outline/10">
                <Images className="h-12 w-12" />
              </div>
            )}
          </div>
          <div className="bg-foundation p-4">
            <h3 className="font-medium text-lg text-primary">{album.name}</h3>
            <p className="text-base text-secondary">{album.count}枚の写真</p>
          </div>
        </div>
      </div>
    )
  );
});

Card.displayName = "Card";
