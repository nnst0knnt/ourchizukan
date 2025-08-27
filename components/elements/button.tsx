import { cn } from "@/styles/functions";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

/**
 * ボタンの種類
 */
type ButtonKind = "primary" | "secondary";

/**
 * ボタンのサイズ
 */
type ButtonSize = "default" | "large";

/**
 * ボタンのアイコンの位置
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
 * Buttonのプロパティ
 */
export type ButtonProps = {
  /** ボタンの種類 */
  kind?: ButtonKind;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** 表示するアイコン */
  icon?: LucideIcon;
  /** アイコンの位置 */
  iconPosition?: ButtonIconPosition;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** ボタンの状態 */
  status?: ButtonStatus;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button
 *
 * 高齢者にも使いやすいよう、十分なタッチ領域とコントラストを確保しています。
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
      ...props
    },
    ref,
  ) => {
    const isDisabled =
      disabled ||
      status === ButtonStatus.Loading ||
      status === ButtonStatus.Success ||
      status === ButtonStatus.Error;

    const baseStyles =
      "rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 shadow-sm flex items-center justify-center gap-2 relative";

    const kindStyles = {
      primary: "bg-brand text-foreground hover:bg-brand/90 active:bg-brand/80",
      secondary:
        "bg-accent text-foreground hover:bg-accent/90 active:bg-accent/80",
    };

    const sizeStyles = {
      default: "py-2 px-4 min-h-11",
      large: "py-3 px-6 text-lg min-h-14",
    };

    const statusStyles = {
      idle: "",
      loading: "cursor-wait",
      success:
        "bg-success text-foreground hover:bg-success/90 active:bg-success/80",
      error: "bg-error text-foreground hover:bg-error/90 active:bg-error/80",
    };

    const iconSize = size === "large" ? 24 : 20;

    const statusIcons = {
      loading: (
        <Loader2 className="animate-spin" size={iconSize} strokeWidth={3.5} />
      ),
      success: <CheckCircle2 size={iconSize} strokeWidth={3.5} />,
      error: <XCircle size={iconSize} strokeWidth={3.5} />,
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          baseStyles,
          kindStyles[kind],
          sizeStyles[size],
          statusStyles[status],
          fullWidth ? "w-full" : "",
          isDisabled ? "opacity-60 cursor-not-allowed" : "",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            status !== ButtonStatus.Idle ? "opacity-50" : "",
          )}
        >
          {Icon && iconPosition === "left" && (
            <Icon size={iconSize} aria-hidden="true" />
          )}

          <span>{children}</span>

          {Icon && iconPosition === "right" && (
            <Icon size={iconSize} aria-hidden="true" />
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
