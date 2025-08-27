import { validator } from "@/routes/middlewares";
import { StatusCodes } from "http-status-codes";
import { factory } from "../../../helpers";
import { GetPicture } from "./schema";

export const get = factory.createHandlers(
  validator.path(GetPicture),
  async (context) => {
    const { id } = context.req.valid("param");

    const picture = await context.var.storage.pictures.get(id);

    if (!picture) {
      return context.newResponse(null, StatusCodes.OK);
    }

    return context.newResponse(picture.data, StatusCodes.OK, {
      "Content-Type": picture.mime,
    });
  },
);
