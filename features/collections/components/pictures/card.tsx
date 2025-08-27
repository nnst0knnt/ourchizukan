import Image from "next/image";
import { memo } from "react";
import type { PictureCard } from "../../models/card";

type CardProps = {
  model?: PictureCard;
  loading?: boolean;
  onClick?: () => void;
};

export const Card = memo<CardProps>(
  ({ model = null, loading = false, onClick }) => {
    if (loading || !model) {
      return (
        <div className="aspect-square w-full animate-pulse rounded-lg bg-outline/30" />
      );
    }

    return (
      <button
        type="button"
        onClick={onClick}
        className="relative aspect-square w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-focus"
        aria-label={model.name || "写真を表示"}
      >
        <Image
          src={model.url}
          alt={model.name || "写真"}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </button>
    );
  },
);

Card.displayName = "Card";
