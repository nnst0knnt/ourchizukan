import { NextResponse } from "next/server";
import { factory } from "./routes/helpers";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon*|manifest*|scripts).*)"],
};

export const middleware = factory
  .createApp()
  .all("*", () => NextResponse.next()).fetch;
