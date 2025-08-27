import { validator } from "@/routes/middlewares";
import { StatusCodes } from "http-status-codes";
import { factory } from "../../../helpers";
import { CreateAlbum } from "./schema";

export const create = factory.createHandlers(
  validator.json(CreateAlbum),
  async (context) => {
    /** TODO */
    const body = context.req.valid("json");

    console.log(body);

    return context.json("アルバムを作成しました！", StatusCodes.OK);
  },
);
