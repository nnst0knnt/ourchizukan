import { Hono } from "hono";
import { get } from "./get";
import { upload } from "./upload";

/**
 * /api/pictures
 *
 * 写真に関するAPIをまとめたルートです。
 */
export const pictures = new Hono().get("/:id", ...get).post("/", ...upload);
