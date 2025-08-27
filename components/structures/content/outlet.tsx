import { type PropsWithChildren, memo } from "react";

import { cn } from "@/styles/functions";

export const Outlet = memo<PropsWithChildren>(({ children }) => (
  <main
    className={cn(
      "relative mx-auto w-full max-w-7xl flex-1",
      "py-4 md:py-6 lg:py-8",
      "px-4 md:px-6 lg:px-8",
      "no-scrollbar overflow-hidden overflow-y-auto",
    )}
  >
    {children}
  </main>
));

Outlet.displayName = "Outlet";
