"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/styles/functions";

import { Logo } from "../symbol";
import { Link, type LinkProps } from "./link";

/**
 * LogoLinkProps
 */
type LogoLinkProps = {
  /** リンクのサイズ */
  size?: LinkProps["size"];
  /** 印のみ表示 */
  markOnly?: boolean;
  /** 無効状態かどうか */
  disabled?: boolean;
  /** リンクとしての機能をオフにする */
  fake?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

/**
 * LogoLink
 *
 * `おうちずかん`のロゴのリンクです。
 * 押下時にルートへ遷移します。
 */
export const LogoLink = forwardRef<HTMLAnchorElement, LogoLinkProps>(
  (
    {
      size = "default",
      markOnly = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const sizeStyles = {
      small: "text-base",
      default: "text-lg",
      large: "text-xl",
    };

    return (
      <div className="flex items-center">
        <Link
          ref={ref}
          href="/"
          kind="default"
          mark={Logo}
          size={size}
          className={cn(
            "flex flex-row items-center gap-2",
            disabled && "pointer-events-none opacity-100!",
            className,
          )}
          underline={false}
          aria-label="おうちずかんのトップページへ戻る"
          /** プリフェッチによって未認証時に / へ遷移できる状態を回避する */
          prefetch={false}
          {...props}
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
