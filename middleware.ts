import { except } from "hono/combine";
import type { MiddlewareConfigInput as Config } from "next/dist/build/segment-config/middleware/middleware-config";
import { NextResponse } from "next/server";
import { url, bind, factory, redirect } from "./routes/helpers";
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
      except(
        [redirect.unexpected],
        guard({
          guests: [redirect.unauthenticated],
          failure: {
            unauthenticated: {
              redirect: redirect.unauthenticated,
            },
            authenticated: {
              redirect: redirect.authenticated,
            },
          },
        }),
      ),
    )
    .all("*", () => NextResponse.next())
    .onError((_, context) =>
      NextResponse.rewrite(url(context, redirect.unexpected)),
    ),
);
