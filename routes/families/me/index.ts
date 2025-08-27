import { factory } from "../../helpers";

export default factory.createHandlers(async (context) => {
  return context.json({
    message: "families/me",
  });
});
