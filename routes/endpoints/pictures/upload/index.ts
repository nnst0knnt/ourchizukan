import { validator } from "@/routes/middlewares";
import { StatusCodes } from "http-status-codes";
import { factory, toBody } from "../../../helpers";
import { UploadPicture } from "./schema";

export const upload = factory.createHandlers(
  validator.form(UploadPicture),
  async (context) => {
    /** TODO */
    const body = (await toBody(context, UploadPicture))!;

    console.log(body);

    return context.json("写真をアップロードしました！", StatusCodes.OK);
  },
);
