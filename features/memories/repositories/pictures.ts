import type { ListPicturesQueryParameter } from "@/routes/endpoints/pictures/list/schema";
import type { UploadPicture } from "@/routes/endpoints/pictures/upload/schema";
import { date } from "@/services/date";
import { env } from "@/services/env";
import { http } from "@/services/http";
import type { PictureCard } from "../models/picture";

export const list = async (
  queries: ListPicturesQueryParameter,
): Promise<PictureCard[]> => {
  const response = await http.pictures.$get({
    query: queries,
  });

  return (await response.json()).map((picture) => ({
    id: picture.id,
    albumId: picture.albumId,
    url: `${env.APP_URL}/api/pictures/${picture.id}`,
    takenAt: date(picture.takenAt).format("YYYY-MM-DD"),
  }));
};

export const upload = async (body: UploadPicture) => {
  const response = await http.pictures.$post({
    form: body,
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "写真のアップロードに失敗しました",
    );
  }

  return await response.json();
};
