import type { AlbumCard, PictureCard } from "./models/card";

export const albums: AlbumCard[] = [
  {
    id: "1",
    name: "家族旅行 2024",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400",
    count: 24,
    updatedAt: "2024-04-20",
  },
  {
    id: "2",
    name: "お花見",
    thumbnail:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=400",
    count: 12,
    updatedAt: "2024-03-30",
  },
  {
    id: "3",
    name: "お正月",
    thumbnail:
      "https://images.unsplash.com/photo-1611988615248-5d4f0b9ac31e?q=80&w=400",
    count: 18,
    updatedAt: "2024-01-05",
  },
  {
    id: "4",
    name: "お誕生日",
    thumbnail:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400",
    count: 8,
    updatedAt: "2023-12-10",
  },
];

export const pictures: Record<string, PictureCard[]> = {
  "1": Array(24)
    .fill(0)
    .map((_, i) => ({
      id: `1-${i}`,
      albumId: "1",
      url: `https://picsum.photos/id/${20 + i}/800/600`,
      name: `家族旅行の写真 ${i + 1}`,
      takenAt: "2024-04-15",
    })),
  "2": Array(12)
    .fill(0)
    .map((_, i) => ({
      id: `2-${i}`,
      albumId: "2",
      url: `https://picsum.photos/id/${50 + i}/800/600`,
      name: `お花見の写真 ${i + 1}`,
      takenAt: "2024-03-25",
    })),
};
