import { cn } from "@/styles/functions";
import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import NextLink from "next/link";
import { forwardRef } from "react";

/**
 * リンクの種類
 */
type LinkKind = "default" | "button" | "ghost";

/**
 * リンクのサイズ
 */
type LinkSize = "small" | "default" | "large";

/**
 * アイコンの位置
 */
type IconPosition = "left" | "right";

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
 * Linkのプロパティ
 */
export type LinkProps = {
  /** リンク先URL */
  href: string;
  /** リンクの種類 */
  kind?: LinkKind;
  /** リンクのサイズ */
  size?: LinkSize;
  /** 表示するアイコン */
  icon?: LucideIcon;
  /** アイコンの位置 */
  iconPosition?: IconPosition;
  /** 下線を表示するかどうか */
  underline?: boolean;
  /** 新しいタブで開くかどうか */
  openInNewTab?: boolean;
  /** 外部リンクとして扱うかどうか */
  external?: boolean;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>;

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
      icon: Icon,
      iconPosition = "left",
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

    const enabledExternalIcon = isExternal && !Icon;

    const targetProps = openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    const relProps = isExternal && !openInNewTab ? { rel: "noopener" } : {};

    const accessibilityProps = {
      "aria-label": openInNewTab
        ? `${props["aria-label"] || children?.toString() || "リンク"} (新しいタブで開きます)`
        : props["aria-label"],
    };

    const baseStyles =
      "inline-flex items-center gap-2 w-fit rounded focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 focus:px-2 transition-all duration-200";

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

    const iconSizes = {
      small: 14,
      default: 16,
      large: 20,
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
        {Icon && iconPosition === "left" && (
          <Icon size={iconSizes[size]} aria-hidden="true" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === "right" && (
          <Icon size={iconSizes[size]} aria-hidden="true" />
        )}
        {enabledExternalIcon && (
          <ExternalLink size={iconSizes[size]} aria-hidden="true" />
        )}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
