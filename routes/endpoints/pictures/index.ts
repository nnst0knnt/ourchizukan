import { Hono } from "hono";
import { get } from "./get";

/**
 * /api/pictures
 *
 * 写真に関するAPIをまとめたルートです。
 */
export const pictures = new Hono().get("/:id", ...get);
