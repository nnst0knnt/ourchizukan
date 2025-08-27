import { cn } from "@/styles/functions";
import { type PropsWithChildren, memo } from "react";
import { Centered } from "./centered";
import { Container } from "./container";

type CoveredProps = {
  className?: string;
} & PropsWithChildren;

export const Covered = memo<CoveredProps>(({ className, children }) => (
  <div
    className={cn(
      "no-scrollbar overflow-hidden overflow-y-auto",
      "absolute inset-0 z-10 h-[calc(100%-4rem)] w-full bg-foundation",
      "py-4 md:py-6 lg:py-8",
      "px-4 md:px-6 lg:px-8",
      className,
    )}
  >
    <Centered>
      <Container>{children}</Container>
    </Centered>
  </div>
));

Covered.displayName = "Covered";
