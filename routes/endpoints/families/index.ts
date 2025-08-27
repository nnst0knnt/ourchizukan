import { Hono } from "hono";
import { enter } from "./enter";
import { member } from "./member";

/**
 * /api/families
 *
 * 家族に関するAPIをまとめたルートです。
 */
export const families = new Hono()
  .post("/enter", ...enter)
  .get("/member", ...member);
