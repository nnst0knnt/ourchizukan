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

    const uploaded: (typeof pictures.$inferSelect)[] = [];
    for (const file of body.files) {
      const id = uuid();
      const originalKey = `${ObjectKey.Picture.original}/${uuid()}`;
      const thumbnailKey = `${ObjectKey.Picture.thumbnail}/${uuid()}`;
      const now = date().unix();

      const buffer = await file.arrayBuffer();

      await context.var.buckets.pictures.put(originalKey, buffer, {
        mime: file.type,
      });

      await context.var.buckets.pictures.put(thumbnailKey, buffer, {
        mime: file.type,
      });

      await context.var.database.insert(pictures).values({
        id,
        albumId: body.albumId,
        originalKey,
        thumbnailKey,
        takenAt: now,
        createdAt: now,
      });

      uploaded.push({
        id,
        albumId: body.albumId,
        originalKey,
        thumbnailKey,
        takenAt: now,
        createdAt: now,
      });
    }

    return context.json(
      {
        message: `${uploaded.length}枚の写真をアップロードしました`,
        pictures: uploaded,
      },
      StatusCodes.CREATED,
    );
  },
);
