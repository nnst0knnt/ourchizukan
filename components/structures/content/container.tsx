import { type PropsWithChildren, memo } from "react";

export const Container = memo<PropsWithChildren>(({ children }) => (
  <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">{children}</div>
));

Container.displayName = "Container";
