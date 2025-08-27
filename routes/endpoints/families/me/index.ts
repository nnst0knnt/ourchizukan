import { factory } from "../../../helpers";

export const me = factory.createHandlers(async (context) => {
  const session = await context.var.keeper.session.get(context.var.ip);

  return context.json(
    session
      ? {
          method: session.method,
        }
      : null,
  );
});
