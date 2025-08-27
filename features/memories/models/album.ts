import type { PictureCard } from "./picture";

export type AlbumCard = {
  id: string;
  name: string;
  thumbnail: string;
  count: number;
  updatedAt: string;
};

export type AlbumPictures = {
  id: string;
  title: string;
  createdAt: string;
  cards: PictureCard[];
};
