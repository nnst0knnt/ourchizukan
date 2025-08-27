import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { every } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { type ZodSchema, z } from "zod";

/**
 * リクエストボディ必須のミドルウェア
 */
const hasBody = <Kind extends keyof Pick<ValidationTargets, "json" | "form">>(
  kind: Kind,
) =>
  zValidator(
    kind,
    z.record(z.any()).refine((object) => Object.keys(object).length > 0),
    ({ success }, context) => {
      if (!success) {
        return context.json(
          ReasonPhrases.UNPROCESSABLE_ENTITY,
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
    },
  );

/**
 * リクエストボディのバリデーションを行うミドルウェア
 */
const body = <
  Kind extends keyof Pick<ValidationTargets, "json" | "form">,
  Schema extends ZodSchema,
>(
  schema: Schema,
  kind: Kind,
) => {
  const middleware = zValidator(kind, schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

  return every(hasBody(kind), middleware) as typeof middleware;
};

/**
 * パスパラメータのバリデーションを行うミドルウェア
 */
const path = <Schema extends ZodSchema>(schema: Schema) =>
  zValidator("param", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

/**
 * クエリパラメータのバリデーションを行うミドルウェア
 */
const query = <Schema extends ZodSchema>(schema: Schema) =>
  zValidator("query", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

/**
 * リクエストをバリデーションするミドルウェア
 */
export const validator = {
  body,
  path,
  query,
};
