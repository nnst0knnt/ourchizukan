import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { pictures } from "@/database/schema";
import { ObjectKey } from "@/models";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { GetPicturePathParameter, GetPictureQueryParameter } from "./schema";

export const get = factory.createHandlers(
  validator.path(GetPicturePathParameter),
  validator.query(GetPictureQueryParameter),
  async (context) => {
    try {
      const { id } = context.req.valid("param");

      const picture = (
        await context.var.database
          .select()
          .from(pictures)
          .where(eq(pictures.id, id))
          .limit(1)
      )[0];

      if (!picture) {
        return context.json(
          { message: "その写真は見覚えがないようです" },
          StatusCodes.NOT_FOUND,
        );
      }

      const kind = context.req.query("kind") || ObjectKey.Picture.original;
      const object = await context.var.buckets.pictures.get(
        kind === ObjectKey.Picture.original
          ? picture.originalKey
          : picture.thumbnailKey,
      );

      if (!object) {
        return context.json(
          { message: "その写真は見覚えがないようです" },
          StatusCodes.NOT_FOUND,
        );
      }

      return context.newResponse(object.data, StatusCodes.OK, {
        "Content-Type": object.mime,
      });
    } catch (e) {
      console.error("⚠️ 写真の取得に失敗しました", e);

      return context.json(
        { message: "写真の取得に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
