import { factory } from "../../../helpers";

export default factory.createHandlers((context) => {
  return context.json({
    message: "families/enter",
  });
});
