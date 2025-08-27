import { StatusCodes } from "http-status-codes";
import { factory } from "../../../helpers";

export const member = factory.createHandlers(async (context) => {
  try {
    const session = await context.var.keeper.session.get(context.var.ip);

    return context.json(
      session
        ? {
            method: session.method,
          }
        : null,
      StatusCodes.OK,
    );
  } catch (e) {
    console.error("⚠️ セッションの取得に失敗しました", e);

    return context.json(
      { message: "セッションの取得に失敗しました" },
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
});
