"use client";

import { memo, useMemo } from "react";

import { usePathname } from "next/navigation";

import { Film, Home, Image, type LucideIcon } from "lucide-react";

import { date } from "@/clients/date";
import { Link } from "@/components/elements";
import { cn } from "@/styles/functions";

/**
 * ナビゲーションリンク
 */
type NavigationLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

/**
 * ナビゲーションリンク一覧
 */
const links: NavigationLink[] = [
  {
    name: "ホーム",
    href: "/",
    icon: Home,
  },
  {
    name: "写真",
    href: "/photos",
    icon: Image,
  },
  {
    name: "動画",
    href: "/videos",
    icon: Film,
  },
];

/**
 * Footer
 *
 * アプリケーション全体のフッターです。
 * 主要ページへのナビゲーションと著作権表示を提供します。
 */
export const Footer = memo(() => {
  const pathname = usePathname();

  const Links = useMemo(
    () =>
      links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            kind="default"
            underline={false}
            className={cn(
              "flex min-h-14 min-w-14 flex-col items-center justify-center p-3",
              "md:flex-row md:gap-2 md:p-3",
              isActive
                ? "text-brand hover:text-brand"
                : "text-secondary hover:text-primary",
            )}
            icon={link.icon}
            iconPosition="left"
            iconProps={{
              size: 24,
              className: cn(isActive && "fill-brand/10"),
            }}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="font-medium text-sm md:text-base">
              {link.name}
            </span>
          </Link>
        );
      }),
    [pathname],
  );

  return (
    <footer className="sticky bottom-0 z-50 w-full border-outline border-t bg-foundation shadow-sm md:relative">
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center px-4 md:px-6 lg:px-8">
        <div className="flex w-full justify-around pt-1 md:max-w-md md:justify-between">
          {Links}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 pb-3 text-center text-secondary text-xs">
        <span>© {date().format("YYYY")}</span>
        <span>おうちずかん</span>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
