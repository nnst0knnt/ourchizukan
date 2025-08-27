"use client";

import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";

import { cn } from "@/styles/functions";

import type { LucideIcon } from "lucide-react";

/**
 * テキストエリアのサイズ
 */
type TextareaSize = "default" | "large";

/**
 * テキストエリアの状態
 */
type TextareaStatus = "default" | "error" | "success";

/**
 * TextareaProps
 */
export type TextareaProps = {
  /** テキストエリアのラベル */
  label?: string;
  /** テキストエリアのサイズ */
  size?: TextareaSize;
  /** 通常のヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** テキストエリアを表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** 高さを自動調整するかどうか */
  autoResize?: boolean;
  /** 最小行数 */
  minRows?: number;
  /** 最大行数（自動調整時のみ有効） */
  maxRows?: number;
  /** 文字数カウンターを表示するかどうか */
  counter?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

/**
 * Textarea
 *
 * 複数行の入力に対応するテキストエリアです。
 * 状態に応じた視覚的フィードバックを提供し、自動リサイズにも対応します。
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      disabled,
      required,
      fullWidth = false,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      counter = false,
      value,
      defaultValue,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const counterRef = useRef<HTMLDivElement>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: TextareaStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const sizeStyles = {
      default: "py-3 px-4 min-h-20 text-base",
      large: "py-4 px-5 min-h-24 text-lg",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2 top-1/2 left-3",
      large: "h-6 w-6 stroke-2 top-1/2 left-4",
    };

    const paddingStyles = {
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
      "resize-none",
      /** @see https://docs.keeper.io/en/user-guides/troubleshooting/website-developers */
      "keeper-ignore",
      sizeStyles[size],
      statusStyles[status],
      Mark && paddingStyles[size],
      className,
    );

    const resize = useCallback(() => {
      if (!autoResize || !textareaRef.current) return;

      /** テキストエリアの高さをリセット */
      textareaRef.current.style.height = "auto";

      /** 行の高さ */
      const lineHeight =
        Number.parseFloat(getComputedStyle(textareaRef.current).lineHeight) ||
        /** @see https://developer.mozilla.org/ja/docs/Web/CSS/line-height#normal */
        Number.parseFloat(getComputedStyle(textareaRef.current).fontSize) * 1.2;

      /** 上下の余白 */
      const paddingTop = Number.parseFloat(
        getComputedStyle(textareaRef.current).paddingTop,
      );
      const paddingBottom = Number.parseFloat(
        getComputedStyle(textareaRef.current).paddingBottom,
      );
      const totalPadding = paddingTop + paddingBottom;

      /** 最小高さと最大高さ */
      const minHeight = minRows * lineHeight + totalPadding;
      const maxHeight = maxRows
        ? maxRows * lineHeight + totalPadding
        : Number.POSITIVE_INFINITY;

      /** スクロールの高さ */
      const scrollHeight = textareaRef.current.scrollHeight;

      /** 最小値と最大値の範囲内で高さを調整 */
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    }, [autoResize, minRows, maxRows]);

    const count = useCallback(() => {
      if (!counter || !textareaRef.current || !counterRef.current) return;

      const currentLength = textareaRef.current.value.length;
      const maxLength =
        textareaRef.current.maxLength > 0
          ? textareaRef.current.maxLength
          : null;

      if (maxLength) {
        counterRef.current.textContent = `${currentLength} / ${maxLength}`;
      } else {
        counterRef.current.textContent = `${currentLength} 文字`;
      }
    }, [counter]);

    const input = useCallback(() => {
      resize();
      count();
    }, [resize, count]);

    useEffect(() => {
      if (textareaRef.current) {
        input();
      }
    }, [input]);

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

          <textarea
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }

              textareaRef.current = node;
            }}
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classNames}
            aria-invalid={hasError}
            aria-describedby={message ? messageId : ariaDescribedBy}
            onInput={input}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between">
          {message && (
            <p
              id={messageId}
              className={cn(
                "mt-1 select-none text-sm",
                statusTextStyles[status],
              )}
            >
              {message}
            </p>
          )}

          {counter && (
            <div
              ref={counterRef}
              className="mt-1 ml-auto text-secondary text-sm"
              aria-live="polite"
            >
              0 文字
            </div>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
