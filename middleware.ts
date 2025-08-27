import type { MiddlewareConfigInput as Config } from "next/dist/build/segment-config/middleware/middleware-config";
import { NextResponse } from "next/server";
import { bind, factory } from "./routes/helpers";

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
  factory.createApp().all("*", () => NextResponse.next()),
);
