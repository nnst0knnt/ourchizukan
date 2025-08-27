"use client";

import {
  type ChangeEvent,
  type InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
} from "react";

import { Circle } from "lucide-react";

import { cn } from "@/styles/functions";

import { RadioGroupState, type RadioSize } from "./radio-group";

/**
 * ラジオボタンの状態
 */
export type RadioStatus = "default" | "error" | "success";

/**
 * RadioOptionProps
 */
export type RadioOptionProps = {
  /** ラジオボタンのラベル */
  label?: string;
  /** ラジオボタンのサイズ */
  size?: RadioSize;
  /** 選択されているかどうか */
  checked?: boolean;
  /** ヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 値が変更されたときのハンドラー */
  onChange?: (checked: boolean) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "size" | "onChange"
>;

/**
 * RadioOption
 *
 * 複数の選択肢から一つを選択するラジオボタンです。
 * RadioGroupと組み合わせて使用することで複数の選択肢をグループ化できます。
 */
export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  (
    {
      id,
      label,
      size,
      checked,
      helperText,
      error,
      success,
      required,
      disabled,
      value,
      className,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const defaultRef = useRef<HTMLInputElement>(null);

    const state = useContext(RadioGroupState);

    const isChecked =
      !!checked || (!!value && state.value === value.toString());

    const change = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e.target.checked);
        }
      },
      [onChange],
    );

    const click = useCallback(() => {
      if (isChecked) return;

      if (typeof ref !== "function" && ref && ref.current) {
        ref.current.click();

        return;
      }

      if (defaultRef.current) {
        defaultRef.current.click();
      }
    }, [isChecked, ref]);

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: RadioStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

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

    const containerSizeStyles = {
      default: "h-6 w-6",
      large: "h-8 w-8",
    };

    const circleSizeStyles = {
      default: "h-4 w-4",
      large: "h-5 w-5",
    };

    const labelSizeStyles = {
      default: "text-base",
      large: "text-lg mb-1",
    };

    const classNames = cn("peer sr-only", className);

    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex h-11 items-center">
            <div className="relative flex items-center">
              <input
                ref={ref || defaultRef}
                type="radio"
                id={inputId}
                value={value}
                checked={isChecked}
                disabled={disabled}
                required={required}
                className={classNames}
                aria-describedby={message ? messageId : ariaDescribedBy}
                onChange={change}
                {...props}
              />
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-full border bg-foundation",
                  containerSizeStyles[size || state.size],
                  statusStyles[status],
                  isChecked && "border-brand",
                  disabled && "disabled",
                )}
                onClick={disabled ? undefined : click}
                onKeyDown={disabled ? undefined : click}
              >
                <Circle
                  className={cn(
                    "text-brand opacity-0 transition-opacity",
                    circleSizeStyles[size || state.size],
                    isChecked && "opacity-100",
                  )}
                  aria-hidden="true"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "ml-2 block cursor-pointer rounded font-medium text-primary",
                "flex min-h-11 items-center",
                labelSizeStyles[size || state.size],
                disabled && "disabled",
              )}
            >
              {label}
              {required && <span className="mt-1 ml-1 text-error">*</span>}
            </label>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("select-none pb-2 text-xs", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

RadioOption.displayName = "RadioOption";
