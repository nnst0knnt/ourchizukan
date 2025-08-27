import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { every } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import { factory, toBody } from "../helpers";

const hasBody = <Kind extends keyof Pick<ValidationTargets, "json" | "form">>(
  kind: Kind,
) =>
  zValidator(
    kind,
    z
      .record(z.any(), z.any())
      .refine((object) => Object.keys(object).length > 0),
    ({ success }, context) => {
      if (!success) {
        return context.json(
          { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
    },
  );

const json = <Schema extends z.ZodType>(schema: Schema) => {
  const middleware = zValidator("json", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

  return every(hasBody("json"), middleware) as typeof middleware;
};

const form = <Schema extends z.ZodType>(schema: Schema) => {
  const middleware = factory.createMiddleware(async (context, next) => {
    const body = await toBody(context, schema);

    if (!body) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    await next();
  });

  return middleware;
};

const path = <Schema extends z.ZodType>(schema: Schema) =>
  zValidator("param", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

const query = <Schema extends z.ZodType>(schema: Schema) =>
  zValidator("query", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

export const validator = {
  json,
  form,
  path,
  query,
};
