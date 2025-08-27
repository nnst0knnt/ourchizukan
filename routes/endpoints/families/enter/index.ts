import { factory } from "../../../helpers";

export const enter = factory.createHandlers((context) => {
  return context.json({
    message: "families/enter",
  });
});
