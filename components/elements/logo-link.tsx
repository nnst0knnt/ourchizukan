"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/styles/functions";

import { Link, type LinkProps } from "./link";
import { Logo } from "./logo";

/**
 * LogoLinkProps
 */
export type LogoLinkProps = {
  /** リンクのサイズ */
  size?: LinkProps["size"];
  /** アイコンのみ表示 */
  iconOnly?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 * LogoLink
 *
 * おうちずかんのロゴのリンクです。
 * 押下時にルートへ遷移します。
 */
export const LogoLink = forwardRef<HTMLDivElement, LogoLinkProps>(
  ({ size = "default", iconOnly = true, className, ...props }, ref) => {
    const textSizes = {
      small: "text-base",
      default: "text-lg",
      large: "text-xl",
    };

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        <Link
          href="/"
          kind="default"
          icon={Logo}
          size={size}
          className="flex flex-row items-center gap-2"
          underline={false}
          aria-label="おうちずかんのトップページへ戻る"
        >
          {!iconOnly && (
            <span
              className={cn(
                "font-bold tracking-wider",
                textSizes[size],
                "text-primary",
              )}
            >
              おうちずかん
            </span>
          )}
        </Link>
      </div>
    );
  },
);

LogoLink.displayName = "LogoLink";
