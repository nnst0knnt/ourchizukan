"use client";

import { Link } from "@/components/elements/anchor";
import { cn } from "@/styles/functions";
import { Film, Image, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { type HTMLAttributes, memo } from "react";

const links: {
  name: string;
  href: string;
  mark: LucideIcon;
}[] = [
  {
    name: "写真",
    href: "/albums",
    mark: Image,
  },
  {
    name: "動画",
    href: "/movies",
    mark: Film,
  },
];

type LinksProps = {
  /** プリフェッチするかどうか */
  prefetch?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Links = memo<LinksProps>(({ prefetch = false, ...props }) => {
  const pathname = usePathname();

  return (
    <div {...props}>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            kind="default"
            underline={false}
            className={cn(
              "mt-1 mb-2 flex min-h-14 min-w-14 select-none flex-col items-center justify-center",
              "gap-0.5 pt-3 md:flex-row md:gap-2 md:p-3",
              isActive
                ? "bg-brand text-foreground hover:text-foreground"
                : "text-secondary hover:text-primary",
            )}
            mark={link.mark}
            markPosition="left"
            aria-current={isActive ? "page" : undefined}
            prefetch={prefetch}
          >
            <span className="flex flex-col font-medium text-sm md:text-base">
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
});

Links.displayName = "Links";
