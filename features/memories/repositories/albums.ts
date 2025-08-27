import type { CreateAlbum } from "@/routes/endpoints/albums/create/schema";
import type { GetAlbumPathParameter } from "@/routes/endpoints/albums/get/schema";
import { date } from "@/services/date";
import { env } from "@/services/env";
import { http } from "@/services/http";
import type { AlbumCard, AlbumDescription } from "../models/album";

export const list = async (): Promise<AlbumCard[]> => {
  const response = await http.albums.$get();

  return (await response.json()).map((album) => ({
    id: album.id,
    name: album.title,
    thumbnail: album.thumbnailKey
      ? `${env.APP_URL}/api/pictures/${album.thumbnailKey.split("/").pop()}`
      : "",
    count: album.count,
    updatedAt: date(album.updatedAt).format("YYYY-MM-DD"),
  }));
};

export const get = async (
  path: GetAlbumPathParameter,
): Promise<AlbumDescription> => {
  const response = await http.albums[":id"].$get({
    param: { id: path.id },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "アルバムの取得に失敗しました",
    );
  }

  const album = await response.json();

  return {
    id: album.id,
    title: album.title,
    createdAt: date(album.createdAt).format("YYYY-MM-DD"),
  };
};

export const create = async (body: CreateAlbum): Promise<AlbumDescription> => {
  const response = await http.albums.$post({
    json: body,
  });

  const album = await response.json();

  return {
    id: album.id,
    title: album.title,
    createdAt: date(album.createdAt).format("YYYY-MM-DD"),
  };
};
