import { env } from "@/services/env/client";

/**
 * Enter
 *
 * `おうちずかん`への入口となるページです。
 */
export const Enter = () => (
  <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">{env.APP_URL}</div>
);
