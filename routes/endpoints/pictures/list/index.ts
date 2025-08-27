import { and, count, desc, eq, type SQL } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { pictures } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { ListPicturesQueryParameter } from "./schema";

export const list = factory.createHandlers(
  validator.query(ListPicturesQueryParameter),
  async (context) => {
    try {
      const { albumId, offset, limit } = context.req.valid("query");

      const where: SQL[] = [];
      if (albumId) {
        where.push(eq(pictures.albumId, albumId));
      }

      return context.json(
        {
          count: (
            await context.var.database
              .select({ count: count(pictures.id) })
              .from(pictures)
              .where(and(...where))
          )[0].count,
          data: await context.var.database
            .select()
            .from(pictures)
            .where(and(...where))
            .orderBy(desc(pictures.takenAt))
            .limit(limit)
            .offset(offset),
        },
        StatusCodes.OK,
      );
    } catch (e) {
      console.error("⚠️ 写真一覧の取得に失敗しました", e);

      return context.json(
        { message: "写真一覧の取得に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
