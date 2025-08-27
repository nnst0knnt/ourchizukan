export type AlbumCard = {
  id: string;
  name: string;
  thumbnail: string;
  count: number;
  updatedAt: string;
};

export type PictureCard = {
  id: string;
  albumId: string;
  url: string;
  name: string;
  takenAt: string;
};
