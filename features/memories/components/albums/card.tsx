import { useKeyboard } from "@/hooks";
import { cn } from "@/styles/functions";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import type { AlbumCard } from "../../models/card";

type CardProps = {
  model?: AlbumCard;
  loading?: boolean;
};

export const Card = memo<CardProps>(({ model = null, loading = false }) => {
  const router = useRouter();

  const click = useCallback(
    () => (model ? router.push(`/albums/${model.id}`) : null),
    [model, router],
  );

  const { keydown } = useKeyboard({
    Enter: click,
  });

  if (loading || !model) {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-outline bg-foundation shadow-sm">
        <div className="aspect-square animate-pulse bg-outline/30" />
        <div className="p-4">
          <div className="mb-2 h-5 animate-pulse rounded bg-outline/30" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-outline/30" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg",
        "border border-outline bg-foundation shadow-sm transition-shadow duration-300 hover:shadow-md",
      )}
      role="link"
      onClick={click}
      onKeyDown={keydown}
      tabIndex={0}
      aria-label={`${model.name || "アルバム"}を開く`}
    >
      <div className="relative aspect-square">
        {model.thumbnail ? (
          <Image
            src={model.thumbnail}
            alt={model.name || "アルバム"}
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
      <div className="p-4">
        <h3 className="font-medium text-lg text-primary">{model.name}</h3>
        <p className="text-base text-secondary">{model.count}枚の写真</p>
      </div>
    </div>
  );
});

Card.displayName = "Card";
