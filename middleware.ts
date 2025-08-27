import type { MiddlewareConfigInput as Config } from "next/dist/build/segment-config/middleware/middleware-config";
import { NextResponse } from "next/server";
import {
  url,
  bind,
  factory,
  unauthenticated,
  unexpected,
} from "./routes/helpers";
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

export const middleware = bind(
  factory
    .createApp()
    .use(environment())
    .use(
      guard({
        guests: [unauthenticated, unexpected],
        failure: { redirect: unauthenticated },
      }),
    )
    .all("*", () => NextResponse.next())
    .onError((_, context) => NextResponse.rewrite(url(context, unexpected))),
);
