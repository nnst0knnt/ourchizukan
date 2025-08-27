import Image from "next/image";
import { memo } from "react";
import type { PictureCard } from "../../models/card";

type CardProps = {
  picture?: PictureCard;
  onClick?: () => void;
};

export const Card = memo<CardProps>(
  ({ picture = null, onClick }) =>
    !!picture && (
      <button
        type="button"
        onClick={onClick}
        className="relative aspect-square w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-focus"
        aria-label={picture.name || "写真を表示"}
      >
        <div className="absolute inset-0 z-0 animate-pulse rounded-lg bg-primary/20" />
        <Image
          src={picture.url}
          alt={picture.name || "写真"}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="relative z-10 object-cover"
        />
      </button>
    ),
);

Card.displayName = "Card";
