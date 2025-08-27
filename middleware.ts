import { NextResponse } from "next/server";
import { bind, factory } from "./routes/helpers";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon*|icon.svg|manifest*|scripts).*)",
  ],
};

export const middleware = bind(
  factory.createApp().all("*", () => NextResponse.next()),
);
