import { factory } from "../../../helpers";

export const leave = factory.createHandlers((context) => {
  return context.json({
    message: "families/leave",
  });
});
