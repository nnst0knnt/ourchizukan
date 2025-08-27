import Image from "next/image";
import { memo } from "react";
import type { PictureCard } from "../../models/picture";

type CardProps = {
  datum: PictureCard;
  onClick?: () => void;
};

export const Card = memo<CardProps>(
  ({ datum = null, onClick }) =>
    !!datum && (
      <button
        type="button"
        onClick={onClick}
        className="relative aspect-square w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-focus"
        aria-label={`${datum.takenAt}の写真を開く`}
      >
        <div className="absolute inset-0 z-0 animate-pulse rounded-lg bg-primary/20" />
        <Image
          src={datum.url}
          alt={`${datum.takenAt}の写真`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="relative z-10 object-cover"
        />
      </button>
    ),
);

Card.displayName = "Card";
