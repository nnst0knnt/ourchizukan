import type { ListPicturesQueryParameter } from "@/routes/endpoints/pictures/list/schema";
import type { UploadPicturesBody } from "@/routes/endpoints/pictures/upload/schema";
import { date } from "@/services/date";
import { env } from "@/services/env";
import { http } from "@/services/http";

export const list = async (queries: ListPicturesQueryParameter) => {
  const response = await http.pictures.$get({
    query: queries,
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "写真一覧の取得に失敗しました",
    );
  }

  return (await response.json()).map((picture) => ({
    id: picture.id,
    albumId: picture.albumId,
    url: `${env.APP_URL}/api/pictures/${picture.id}`,
    takenAt: date(picture.takenAt).format("YYYY-MM-DD"),
  }));
};

export const upload = async (body: UploadPicturesBody) => {
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
