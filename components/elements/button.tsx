import { type ButtonHTMLAttributes, Children, forwardRef } from "react";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { cn } from "@/styles/functions";

import type { LucideIcon } from "lucide-react";

/**
 * ボタンの種類
 */
type ButtonKind = "primary" | "secondary";

/**
 * ボタンのサイズ
 */
type ButtonSize = "default" | "large";

/**
 * ボタンのアイコンの表示位置
 */
type ButtonIconPosition = "left" | "right";

/**
 * ボタンの状態
 */
export const ButtonStatus = {
  Idle: "idle",
  Loading: "loading",
  Success: "success",
  Error: "error",
} as const;
export type ButtonStatus = (typeof ButtonStatus)[keyof typeof ButtonStatus];

/**
 * ButtonProps
 */
export type ButtonProps = {
  /** ボタンの種類 */
  kind?: ButtonKind;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** 表示するアイコン */
  icon?: LucideIcon;
  /** アイコンの表示位置 */
  iconPosition?: ButtonIconPosition;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** ボタンの状態 */
  status?: ButtonStatus;
  /** アクセシビリティのためのラベル（テキストがない場合や説明が必要な場合） */
  "aria-label"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button
 *
 * アイコン付きサポートのシンプルなボタンです。
 * 状態によってアイコンが切り替わり、視覚的に進捗を表示します。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      kind = "primary",
      size = "default",
      icon: Icon,
      iconPosition = "left",
      status = ButtonStatus.Idle,
      fullWidth = false,
      disabled,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled =
      disabled ||
      status === ButtonStatus.Loading ||
      status === ButtonStatus.Success ||
      status === ButtonStatus.Error;

    const hasTextContent = Children.toArray(children).some(
      (child) => typeof child === "string" || typeof child === "number",
    );

    const baseStyles =
      "rounded-md font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 relative";

    const kindStyles = {
      primary: "bg-brand text-foreground hover:bg-brand/90 active:bg-brand/80",
      secondary:
        "bg-accent text-foreground hover:bg-accent/90 active:bg-accent/80",
    };

    const sizeStyles = {
      default: "py-2 px-4 min-h-11",
      large: "py-3 px-6 text-lg min-h-14",
    };

    const iconSizes = {
      default: 20,
      large: 24,
    };

    const statusStyles = {
      idle: "",
      loading: "cursor-wait",
      success:
        "bg-success text-foreground hover:bg-success/90 active:bg-success/80",
      error: "bg-error text-foreground hover:bg-error/90 active:bg-error/80",
    };

    const statusIcons = {
      loading: (
        <Loader2
          className="animate-spin"
          size={iconSizes[size]}
          strokeWidth={3.5}
        />
      ),
      success: <CheckCircle2 size={iconSizes[size]} strokeWidth={3.5} />,
      error: <XCircle size={iconSizes[size]} strokeWidth={3.5} />,
    };

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      statusStyles[status],
      fullWidth ? "w-full" : "",
      isDisabled ? "opacity-60 cursor-not-allowed" : "",
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classNames}
        aria-label={!hasTextContent ? ariaLabel : "ボタン"}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            status !== ButtonStatus.Idle ? "opacity-50" : "",
          )}
        >
          {Icon && iconPosition === "left" && (
            <Icon size={iconSizes[size]} aria-hidden="true" />
          )}

          <span>{children}</span>

          {Icon && iconPosition === "right" && (
            <Icon size={iconSizes[size]} aria-hidden="true" />
          )}
        </div>

        {status !== ButtonStatus.Idle && (
          <div className="absolute inset-0 flex items-center justify-center">
            {statusIcons[status]}
          </div>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
