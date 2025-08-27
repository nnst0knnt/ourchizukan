import { serialize } from "object-to-formdata";
import { ObjectKey } from "@/models";
import type { ListPicturesQueryParameter } from "@/routes/endpoints/pictures/list/schema";
import type { UploadPicturesBody } from "@/routes/endpoints/pictures/upload/schema";
import { date } from "@/services/date";
import { env } from "@/services/env";
import { http } from "@/services/http";

export const list = async ({
  offset,
  limit,
  ...queries
}: ListPicturesQueryParameter) => {
  const response = await http.pictures.$get({
    query: {
      ...queries,
      offset: offset.toString(),
      limit: limit.toString(),
    },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "写真一覧の取得に失敗しました",
    );
  }

  return (await response.json()).map((picture) => ({
    id: picture.id,
    albumId: picture.albumId,
    originalUrl: `${env.APP_URL}/api/pictures/${picture.id}?kind=${ObjectKey.Picture.original}`,
    thumbnailUrl: `${env.APP_URL}/api/pictures/${picture.id}?kind=${ObjectKey.Picture.thumbnail}`,
    takenAt: date(picture.takenAt).format("YYYY-MM-DD"),
  }));
};

export const upload = async (body: UploadPicturesBody) => {
  const response = await http.pictures.$post({
    form: serialize(body, {
      indices: true,
      dotsForObjectNotation: true,
    }),
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "写真のアップロードに失敗しました",
    );
  }

  return await response.json();
};
