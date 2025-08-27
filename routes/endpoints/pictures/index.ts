import { Hono } from "hono";
import { get } from "./get";
import { list } from "./list";
import { upload } from "./upload";

/**
 * /api/pictures
 *
 * 写真に関するAPIをまとめたルートです。
 */
export const pictures = new Hono()
  .get("/", ...list)
  .post("/", ...upload)
  .get("/:id", ...get);
