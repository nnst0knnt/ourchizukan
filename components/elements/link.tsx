import {
  type AnchorHTMLAttributes,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
} from "react";

import NextLink from "next/link";

import { ExternalLink, type LucideIcon } from "lucide-react";

import { cn } from "@/styles/functions";

/**
 * リンクの種類
 */
type LinkKind = "default" | "button" | "ghost";

/**
 * リンクのサイズ
 */
type LinkSize = "small" | "default" | "large";

/**
 * リンクを表す印の表示位置
 */
type MarkPosition = "left" | "right";

/**
 * 外部リンクかどうかを判定する
 */
const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("ftp://") ||
    url.startsWith("file://") ||
    url.startsWith("sms:")
  );
};

/**
 * LinkProps
 */
export type LinkProps = {
  /** リンク先URL */
  href: string;
  /** リンクの種類 */
  kind?: LinkKind;
  /** リンクのサイズ */
  size?: LinkSize;
  /** リンクを表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** リンクを表す印の表示位置 */
  markPosition?: MarkPosition;
  /** 下線を表示するかどうか */
  underline?: boolean;
  /** 新しいタブで開くかどうか */
  openInNewTab?: boolean;
  /** 外部リンクとして扱うかどうか */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">;

/**
 * Link
 *
 * ページ遷移時に使用するシンプルなリンクです。
 * 内部リンクと外部リンクを自動的に判別します。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      kind = "default",
      size = "default",
      mark: Mark,
      markPosition = "left",
      underline = true,
      openInNewTab = false,
      external: isExternalProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isExternal =
      isExternalProp !== undefined ? isExternalProp : isExternalUrl(href);

    const enabledExternalMark = isExternal && !Mark;

    const targetProps = openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    const relProps = isExternal && !openInNewTab ? { rel: "noopener" } : {};

    const accessibilityProps = {
      "aria-label": openInNewTab
        ? `${props["aria-label"] || href || "リンク"}（新しいタブで開きます)`
        : isExternal
          ? `${props["aria-label"] || href || "リンク"}（外部サイト）`
          : props["aria-label"] || href || "リンク",
    };

    const baseStyles =
      "inline-flex items-center gap-2 w-fit rounded transition-all duration-200";

    const kindStyles = {
      default:
        "text-primary hover:text-primary/80 hover:scale-105 active:scale-100",
      button:
        "py-2 px-4 bg-brand text-foreground hover:bg-brand/90 active:bg-brand/80 shadow-sm focus:px-4 hover:shadow-md active:shadow-sm",
      ghost:
        "py-2 px-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 active:bg-primary/20 focus:px-4 hover:shadow-sm active:shadow-none",
    };

    const sizeStyles = {
      small: "text-sm",
      default: "text-base",
      large: "text-lg",
    };

    const markStyles = {
      small: "h-4 w-4 stroke-2 fill-brand/15",
      default: "h-5 w-5 stroke-2 fill-brand/15",
      large: "h-6 w-6 stroke-2 fill-brand/15",
    };

    const underlineStyles =
      underline && kind === "default"
        ? "underline decoration-2 underline-offset-4"
        : "";

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      underlineStyles,
      className,
    );

    return (
      <NextLink
        href={href}
        className={classNames}
        ref={ref}
        {...targetProps}
        {...relProps}
        {...accessibilityProps}
        {...props}
      >
        {Mark && markPosition === "left" && (
          <Mark className={markStyles[size]} aria-hidden="true" />
        )}
        <span>{children}</span>
        {Mark && markPosition === "right" && (
          <Mark className={markStyles[size]} aria-hidden="true" />
        )}
        {enabledExternalMark && (
          <ExternalLink className={markStyles[size]} aria-hidden="true" />
        )}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
