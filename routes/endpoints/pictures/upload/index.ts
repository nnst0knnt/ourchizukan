import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { albums, pictures } from "@/database/schema";
import { ObjectKey } from "@/models";
import { validator } from "@/routes/middlewares";
import { date } from "@/services/date";
import { uuid } from "@/services/uuid";
import { factory, toBody } from "../../../helpers";
import { UploadPicturesBody } from "./schema";

export const upload = factory.createHandlers(
  validator.form(UploadPicturesBody),
  async (context) => {
    const body = (await toBody(context, UploadPicturesBody))!;

    if (!body) {
      return context.json(
        { message: "何も送られていません" },
        StatusCodes.BAD_REQUEST,
      );
    }

    if (body.albumId) {
      const exists = !!(
        await context.var.database
          .select()
          .from(albums)
          .where(eq(albums.id, body.albumId))
          .limit(1)
      )[0];

      if (!exists) {
        return context.json(
          { message: "そのアルバムは見覚えがないようです" },
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    const data: (typeof pictures.$inferSelect)[] = [];
    const uploaded: string[] = [];

    try {
      await context.var.database.transaction(async (transaction) => {
        for (const file of body.files) {
          const id = uuid();
          const originalKey = `${ObjectKey.Picture.original}/${id}`;
          const thumbnailKey = `${ObjectKey.Picture.thumbnail}/${id}`;
          const now = date().unix();

          try {
            const buffer = await file.arrayBuffer();

            await context.var.buckets.pictures.put(originalKey, buffer, {
              mime: file.type,
            });
            uploaded.push(originalKey);

            await context.var.buckets.pictures.put(thumbnailKey, buffer, {
              mime: file.type,
            });
            uploaded.push(thumbnailKey);

            await transaction.insert(pictures).values({
              id,
              albumId: body.albumId,
              originalKey,
              thumbnailKey,
              takenAt: now,
              createdAt: now,
            });

            data.push({
              id,
              albumId: body.albumId,
              originalKey,
              thumbnailKey,
              takenAt: now,
              createdAt: now,
            });
          } catch (e) {
            console.error(`⚠️ ${file.name}のアップロードに失敗しました`, e);

            throw e;
          }
        }
      });

      return context.json(data, StatusCodes.CREATED);
    } catch (e) {
      console.error("🔥 写真のアップロードに失敗しました", e);

      try {
        await Promise.all(
          uploaded.map(async (key: string) => {
            try {
              await context.var.buckets.pictures.delete(key);
            } catch (e) {
              console.error(`⚠️ ${key}の削除に失敗しました`, e);
            }
          }),
        );
      } catch (e) {
        console.error(`⚠️ 写真のクリーンアップに失敗しました`, e);
      }

      return context.json(
        { message: "写真のアップロードに失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
