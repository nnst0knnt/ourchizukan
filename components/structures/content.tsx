import type { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => (
  <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-8">
    {children}
  </main>
);
