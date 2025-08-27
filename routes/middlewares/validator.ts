import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { every } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { type ZodSchema, z } from "zod";
import { factory, toBody } from "../helpers";

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
 * JSONボディのバリデーションを行うミドルウェア
 */
const json = <Schema extends ZodSchema>(schema: Schema) => {
  const middleware = zValidator("json", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

  return every(hasBody("json"), middleware) as typeof middleware;
};

/**
 * フォームボディのバリデーションを行うミドルウェア
 */
const form = <Schema extends ZodSchema>(schema: Schema) => {
  const middleware = factory.createMiddleware(async (context, next) => {
    const body = await toBody(context, schema);

    if (!body) {
      return context.json(
        ReasonPhrases.UNPROCESSABLE_ENTITY,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    await next();
  });

  return middleware;
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
  json,
  form,
  path,
  query,
};
