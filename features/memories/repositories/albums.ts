import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { ObjectKey } from "@/models";
import type { CreateAlbumBody } from "@/routes/endpoints/albums/create/schema";
import type { GetAlbumPathParameter } from "@/routes/endpoints/albums/get/schema";
import type { ListAlbumsQueryParameter } from "@/routes/endpoints/albums/list/schema";
import { date } from "@/services/date";
import { env } from "@/services/env";
import { http } from "@/services/http";

export const list = async ({
  offset,
  limit,
  ...queries
}: ListAlbumsQueryParameter) => {
  const response = await http.albums.$get({
    query: {
      ...queries,
      offset: offset.toString(),
      limit: limit.toString(),
    },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "アルバム一覧の取得に失敗しました",
    );
  }

  return (await response.json()).map((album) => ({
    id: album.id,
    name: album.title,
    thumbnailUrl: `${env.APP_URL}/api/pictures/${album.thumbnailKey}?kind=${ObjectKey.Picture.thumbnail}`,
    count: album.count,
    updatedAt: date(album.updatedAt).format("YYYY-MM-DD"),
  }));
};

export const get = async (path: GetAlbumPathParameter) => {
  const response = await http.albums[":id"].$get({
    param: { id: path.id },
  });

  if (!response.ok) {
    if (response.status === StatusCodes.NOT_FOUND) {
      throw new NotFoundError();
    }

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

export const create = async (body: CreateAlbumBody) => {
  const response = await http.albums.$post({
    json: body,
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "アルバムの作成に失敗しました",
    );
  }

  const album = await response.json();

  return {
    id: album.id,
    title: album.title,
    createdAt: date(album.createdAt).format("YYYY-MM-DD"),
  };
};
