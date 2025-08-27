import { factory } from "../../../helpers";

export const me = factory.createHandlers(async (context) => {
  return context.json({
    message: "families/me",
  });
});
