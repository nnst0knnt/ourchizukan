import { AccessMethod, AttemptKind } from "@/models";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { factory, json } from "../../../helpers";
import { EnterFamily } from "./schema";

export const enter = factory.createHandlers(async (context) => {
  const body = await json(context, EnterFamily);

  if (!body) {
    return context.json(
      ReasonPhrases.UNPROCESSABLE_ENTITY,
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  if (!(await context.var.keeper.attempts.verify(context.var.ip))) {
    return context.json(
      "ちょっと休憩してからもう一度お試しください",
      StatusCodes.TOO_MANY_REQUESTS,
    );
  }

  if (!(await context.var.keeper.whitelist.email(body.email))) {
    await context.var.keeper.attempts.add(
      context.var.ip,
      AttemptKind.FailedEmail,
    );

    return context.json(
      "このメールアドレスは見覚えがないようです",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const session = await context.var.keeper.session.create(
    context.var.ip,
    AccessMethod.Email,
  );

  if (!session) {
    return context.json(
      "今はおうちに入ることができないようです",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return context.json("おうちずかんへようこそ！", StatusCodes.OK);
});
