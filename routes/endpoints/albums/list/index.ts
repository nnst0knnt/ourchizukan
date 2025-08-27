import { count, desc, eq, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { albums, pictures } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { ListAlbumsQueryParameter } from "./schema";

export const list = factory.createHandlers(
  validator.query(ListAlbumsQueryParameter),
  async (context) => {
    try {
      const { offset, limit } = context.req.valid("query");

      return context.json(
        {
          data: await context.var.database
            .select({
              id: albums.id,
              title: albums.title,
              thumbnailId: sql<string>`(
              select ${pictures.id} 
              from ${pictures} 
              where ${pictures.albumId} = ${albums.id}
              order by ${pictures.takenAt} desc
              limit 1
            )`,
              count: count(pictures.id),
              createdAt: albums.createdAt,
            })
            .from(albums)
            .leftJoin(pictures, eq(albums.id, pictures.albumId))
            .groupBy(albums.id, albums.title, albums.createdAt)
            .orderBy(desc(albums.createdAt))
            .limit(limit)
            .offset(offset),
        },
        StatusCodes.OK,
      );
    } catch (e) {
      console.error("⚠️ アルバム一覧の取得に失敗しました", e);

      return context.json(
        { message: "アルバム一覧の取得に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
