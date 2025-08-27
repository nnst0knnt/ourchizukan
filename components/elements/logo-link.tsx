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
  /** 印のみ表示 */
  markOnly?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 * LogoLink
 *
 * おうちずかんのロゴのリンクです。
 * 押下時にルートへ遷移します。
 */
export const LogoLink = forwardRef<HTMLDivElement, LogoLinkProps>(
  ({ size = "default", markOnly = false, className, ...props }, ref) => {
    const sizeStyles = {
      small: "text-base",
      default: "text-lg",
      large: "text-xl",
    };

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        <Link
          href="/"
          kind="default"
          mark={Logo}
          size={size}
          className="flex flex-row items-center gap-2"
          underline={false}
          aria-label="おうちずかんのトップページへ戻る"
        >
          {!markOnly && (
            <span
              className={cn(
                "hidden font-bold tracking-wider md:block",
                sizeStyles[size],
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
