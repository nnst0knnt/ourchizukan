import { Hono } from "hono";
import { create } from "./create";

/**
 * /api/albums
 *
 * アルバムに関するAPIをまとめたルートです。
 */
export const albums = new Hono().post("/", ...create);
