import { app } from "@/routes";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const handle = (_app: typeof app) => (request: Request) => {
  const context = getRequestContext();

  return _app.fetch(request, context.env, context.ctx);
};

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
