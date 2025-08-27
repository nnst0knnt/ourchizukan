import type { PropsWithChildren } from "react";

import { cn } from "@/styles/functions";

export const Content = ({ children }: PropsWithChildren) => (
  <main
    className={cn(
      "mx-auto w-full max-w-7xl flex-1",
      "pt-3 pb-4 md:pt-4 md:pb-6 lg:pt-6 lg:pb-8",
      "px-4 md:px-6 lg:px-8",
    )}
  >
    {children}
  </main>
);
