import { and, desc, eq, type SQL } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { pictures } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { ListPicturesQueryParameter } from "./schema";

export const list = factory.createHandlers(
  validator.query(ListPicturesQueryParameter),
  async (context) => {
    const { albumId } = context.req.valid("query");

    const where: SQL[] = [];
    if (albumId) {
      where.push(eq(pictures.albumId, albumId));
    }

    return context.json(
      await context.var.database
        .select()
        .from(pictures)
        .where(and(...where))
        .orderBy(desc(pictures.takenAt)),
      StatusCodes.OK,
    );
  },
);
