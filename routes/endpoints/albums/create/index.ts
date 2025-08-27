import { StatusCodes } from "http-status-codes";
import { albums } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { date } from "@/services/date";
import { uuid } from "@/services/uuid";
import { factory } from "../../../helpers";
import { CreateAlbumBody } from "./schema";

export const create = factory.createHandlers(
  validator.json(CreateAlbumBody),
  async (context) => {
    const body = context.req.valid("json");
    const id = uuid();
    const now = date().unix();

    await context.var.database.insert(albums).values({
      id,
      title: body.title,
      createdAt: now,
    });

    return context.json(
      {
        id,
        title: body.title,
        createdAt: now,
      },
      StatusCodes.CREATED,
    );
  },
);
