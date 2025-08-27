import { Hono } from "hono";
import { enter } from "./enter";
import { leave } from "./leave";
import { me } from "./me";

/**
 * /api/families
 *
 * 家族に関するAPIをまとめたルートです。
 */
export const families = new Hono()
  .post("/enter", ...enter)
  .post("/leave", ...leave)
  .get("/me", ...me);
