import { secureHeaders } from "hono/secure-headers";
import type { MiddlewareConfigInput as Config } from "next/dist/build/segment-config/middleware/middleware-config";
import { NextResponse } from "next/server";
import { bind, factory } from "./routes/helpers";
import { environment, guard } from "./routes/middlewares";

export const config: Config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon*|icon.svg|manifest*|scripts).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

const redirect = "/house-entries/enter";

export const middleware = bind(
  factory
    .createApp()
    .use(secureHeaders())
    .use(environment())
    .use(
      guard({
        guests: [redirect],
        failure: { redirect },
      }),
    )
    .all("*", () => NextResponse.next()),
);
