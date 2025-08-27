"use client";

import {
  type ButtonHTMLAttributes,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  useState,
} from "react";

import { cn } from "@/styles/functions";

import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * アイコンボタンの種類
 */
type IconButtonKind = "primary" | "secondary" | "ghost";

/**
 * アイコンボタンのサイズ
 */
type IconButtonSize = "small" | "default" | "large";

/**
 * ツールチップの表示位置
 */
type TooltipPosition = "top" | "right" | "bottom" | "left";

/**
 * IconButtonProps
 */
export type IconButtonProps = {
  /** 表示するアイコン */
  icon: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** 表示するアイコンのプロパティ */
  iconProps?: LucideProps;
  /** ボタンのサイズ */
  size?: IconButtonSize;
  /** ボタンの種類 */
  kind?: IconButtonKind;
  /** 背景色を適用するかどうか */
  filled?: boolean;
  /** ツールチップのテキスト */
  tooltip?: string;
  /** ツールチップの表示位置 */
  tooltipPosition?: TooltipPosition;
  /** アクセシビリティのためのラベル */
  "aria-label": string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">;

/**
 * IconButton
 *
 * アイコンのみを表示するコンパクトなボタンです。
 * 認識しやすいサイズとツールチップによる説明をサポートしています。
 * トグル機能も備えており、選択状態を視覚的に表示できます。
 * ツールチップの表示位置を上下左右に変更できます。
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      iconProps,
      size = "default",
      kind = "primary",
      filled = false,
      tooltip,
      tooltipPosition = "top",
      className,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [enabledTooltip, setEnabledTooltip] = useState(false);

    const baseStyles =
      "rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 relative";

    const kindStyles = {
      primary: filled
        ? "bg-brand text-foreground border-2 border-brand/30"
        : "bg-transparent text-brand border-2 border-brand/30 hover:bg-brand/30 active:bg-brand/40",
      secondary: filled
        ? "bg-accent text-foreground border-2 border-accent/30"
        : "bg-transparent text-accent border-2 border-accent/30 hover:bg-accent/30 active:bg-accent/40",
      ghost: filled
        ? cn(
            "bg-primary/10 text-primary",
            disabled ? "border-none" : "border-2 border-primary/20",
          )
        : "bg-transparent text-primary border-2 border-primary/20 hover:bg-primary/10 active:bg-primary/20",
    };

    const sizeStyles = {
      small: "p-1.5 min-h-9 min-w-9",
      default: "p-2 min-h-11 min-w-11",
      large: "p-2.5 min-h-14 min-w-14",
    };

    const iconSizes = {
      small: 16,
      default: 20,
      large: 24,
    };

    const tooltipStyles = {
      primary: "bg-brand text-foreground",
      secondary: "bg-accent text-foreground",
      ghost: "bg-primary text-foundation",
    };

    const tooltipArrowStyles = {
      primary: "border-t-brand",
      secondary: "border-t-accent",
      ghost: "border-t-primary",
    };

    const tooltipSizeStyles = {
      small: "px-2.5 py-2 text-xs",
      default: "px-3 py-2.5 text-sm",
      large: "px-3.5 py-2 text-md",
    };

    const tooltipPositionStyles = {
      top: "absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
      right: "absolute top-1/2 left-full translate-x-2 -translate-y-1/2",
      bottom: "absolute top-full left-1/2 -translate-x-1/2 translate-y-2",
      left: "absolute top-1/2 right-full -translate-x-2 -translate-y-1/2",
    };

    const tooltipArrowPositionStyles = {
      top: "absolute top-full left-1/2 -translate-x-1/2 -translate-y-px",
      right: "absolute right-full top-1/2 translate-x-px -translate-y-1/2",
      bottom: "absolute bottom-full left-1/2 -translate-x-1/2 translate-y-px",
      left: "absolute left-full top-1/2 -translate-x-px -translate-y-1/2",
    };

    const tooltipArrowDirectionStyles = {
      top: tooltipArrowStyles[kind],
      right: tooltipArrowStyles[kind].replace("border-t-", "border-r-"),
      bottom: tooltipArrowStyles[kind].replace("border-t-", "border-b-"),
      left: tooltipArrowStyles[kind].replace("border-t-", "border-l-"),
    };

    const tooltipArrowBorderStyles = {
      top: "border-8 border-transparent",
      right: "border-8 border-transparent",
      bottom: "border-8 border-transparent",
      left: "border-8 border-transparent",
    };

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      className,
    );

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-pressed={filled}
          className={classNames}
          onMouseEnter={() => tooltip && setEnabledTooltip(true)}
          onMouseLeave={() => tooltip && setEnabledTooltip(false)}
          onFocus={() => tooltip && setEnabledTooltip(true)}
          onBlur={() => tooltip && setEnabledTooltip(false)}
          {...props}
        >
          <Icon size={iconSizes[size]} aria-hidden="true" {...iconProps} />

          {tooltip && (
            <div
              className={cn(
                "z-50 flex transform items-center whitespace-nowrap rounded shadow-md transition-opacity duration-200",
                tooltipStyles[kind],
                tooltipSizeStyles[size],
                tooltipPositionStyles[tooltipPosition],
                enabledTooltip
                  ? "opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              aria-hidden={!enabledTooltip}
            >
              <span>{tooltip}</span>
              <div
                className={cn(
                  tooltipArrowPositionStyles[tooltipPosition],
                  "transform",
                )}
              >
                <div
                  className={cn(
                    tooltipArrowBorderStyles[tooltipPosition],
                    tooltipArrowDirectionStyles[tooltipPosition],
                  )}
                />
              </div>
            </div>
          )}
        </button>
      </div>
    );
  },
);

IconButton.displayName = "IconButton";
