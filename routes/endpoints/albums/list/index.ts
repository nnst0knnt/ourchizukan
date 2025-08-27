import { desc, eq, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { albums, pictures } from "@/database/schema";
import { factory } from "../../../helpers";

export const list = factory.createHandlers(async (context) => {
  return context.json(
    await context.var.database
      .select({
        id: albums.id,
        title: albums.title,
        createdAt: albums.createdAt,
        count: sql<number>`coalesce(count(${pictures.id}), 0)`,
        updatedAt: sql<number>`coalesce(max(${pictures.takenAt}), ${albums.createdAt})`,
        thumbnailKey: sql<string>`(
        select ${pictures.thumbnailKey} 
        from ${pictures} 
        where ${pictures.albumId} = ${albums.id}
        order by ${pictures.takenAt} desc
        limit 1
      )`,
      })
      .from(albums)
      .leftJoin(pictures, eq(albums.id, pictures.albumId))
      .groupBy(albums.id, albums.title, albums.createdAt)
      .orderBy(
        desc(
          sql<number>`coalesce(max(${pictures.takenAt}), ${albums.createdAt})`,
        ),
      ),
    StatusCodes.OK,
  );
});
