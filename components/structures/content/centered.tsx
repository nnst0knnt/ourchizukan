import { type PropsWithChildren, memo } from "react";

export const Centered = memo<PropsWithChildren>(({ children }) => (
  <div className="mx-auto h-auto max-w-lg sm:h-full sm:content-center [&>*]:last:pb-4 md:[&>*]:last:pb-6 lg:[&>*]:last:pb-8">
    {children}
  </div>
));

Centered.displayName = "Centered";
