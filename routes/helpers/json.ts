import type { Context } from "hono";
import type { ZodObject, ZodRawShape } from "zod";

/**
 * リクエストボディをJSONに変換する
 */
export const json = async <Shape extends ZodRawShape>(
  context: Context,
  schema: ZodObject<Shape>,
) => {
  try {
    const body = schema.safeParse(await context.req.json());

    return body.success ? body.data : null;
  } catch (_e) {
    return null;
  }
};
