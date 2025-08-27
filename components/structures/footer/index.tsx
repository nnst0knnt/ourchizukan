"use client";

import { Button } from "@/components/elements/trigger";
import { cn } from "@/styles/functions";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

type Path = string;

type Handler = () => void;

type FooterProps = {
  to: Path | Handler;
  fixed?: boolean;
};

export const Footer = memo<FooterProps>(({ to, fixed = false }) => {
  const router = useRouter();

  const click = useCallback(
    () => (typeof to === "string" ? router.push(to) : to()),
    [to, router],
  );

  return (
    <footer
      className={cn(
        "w-full border-outline border-t bg-foundation",
        fixed && "fixed right-0 bottom-0 left-0 z-cover",
        !fixed && "relative",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 pt-2 md:h-16 md:px-6 lg:px-8">
        <Button kind="ghost" onClick={click} aria-label="戻る">
          <span>戻る</span>
        </Button>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
