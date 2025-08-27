import type { PropsWithChildren } from "react";

import { cn } from "@/styles/functions";

/**
 * Content
 *
 * アプリケーション全体のコンテンツ部分です。
 * アプリケーションの中心部分に常時表示されます。
 */
export const Content = ({ children }: PropsWithChildren) => (
  <main
    className={cn(
      "mx-auto w-full max-w-7xl flex-1",
      "py-4 md:py-6 lg:py-8",
      "px-4 md:px-6 lg:px-8",
    )}
  >
    {children}
  </main>
);
