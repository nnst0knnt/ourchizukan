import {
  type ForwardRefExoticComponent,
  type InputHTMLAttributes,
  type RefAttributes,
  forwardRef,
  useId,
} from "react";

import { cn } from "@/styles/functions";

import type { LucideIcon } from "lucide-react";

/**
 * 入力欄のサイズ
 */
type InputSize = "default" | "large";

/**
 * 入力欄の状態
 */
type InputStatus = "default" | "error" | "success";

/**
 * InputProps
 */
export type InputProps = {
  /** 入力欄のラベル */
  label?: string;
  /** 入力欄のサイズ */
  size?: InputSize;
  /** 通常のヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** 入力欄を表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

/**
 * Input
 *
 * 様々な入力タイプに対応する入力欄です。
 * 状態に応じた視覚的フィードバックを提供します。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      className,
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      placeholder,
      type = "text",
      disabled,
      required,
      fullWidth = false,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: InputStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const sizeStyles = {
      default: "py-3 px-4 min-h-11 text-base",
      large: "py-4 px-5 min-h-14 text-lg",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2 top-1/2 left-3",
      large: "h-6 w-6 stroke-2 top-1/2 left-4",
    };

    const paddingsStyles = {
      default: "pl-10",
      large: "pl-12.5",
    };

    const statusStyles = {
      default: "border-outline",
      success: "border-success",
      error: "border-error",
    };

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const classNames = cn(
      "block w-full rounded-md border bg-foundation text-primary placeholder:text-secondary/70!",
      "transition-colors duration-200",
      /** @see https://docs.keeper.io/en/user-guides/troubleshooting/website-developers */
      "keeper-ignore",
      sizeStyles[size],
      statusStyles[status],
      Mark && paddingsStyles[size],
      className,
    );

    return (
      <div
        className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-fit")}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex items-center font-medium text-primary",
              size === "large" ? "text-lg" : "text-base",
            )}
          >
            {label}
            {required && <span className="mt-1 ml-1 text-error">*</span>}
          </label>
        )}

        <div className="relative">
          {Mark && (
            <div className={cn("-translate-y-1/2 absolute", markStyles[size])}>
              <Mark
                className={cn("text-secondary", markStyles[size])}
                aria-hidden="true"
              />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classNames}
            aria-invalid={hasError}
            aria-describedby={message ? messageId : ariaDescribedBy}
            {...props}
          />
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
