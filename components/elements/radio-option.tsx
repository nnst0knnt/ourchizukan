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

import { SelectedValue } from "./radio-group";

/**
 * ラジオボタンの状態
 */
export type RadioOptionStatus = "default" | "error" | "success";

/**
 * RadioOptionProps
 */
export type RadioOptionProps = {
  /** ラジオボタンのラベル */
  label?: string;
  /** 選択されているかどうか */
  checked?: boolean;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** ヘルプテキスト */
  helperText?: string;
  /** 値が変更されたときのハンドラー */
  onChange?: (checked: boolean) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "onChange"
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
      value,
      className,
      checked,
      error,
      success,
      helperText,
      required,
      disabled,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const defaultRef = useRef<HTMLInputElement>(null);

    const selectedValue = useContext(SelectedValue);

    const isChecked =
      !!checked || (!!value && selectedValue === value.toString());

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: RadioOptionStatus = hasError
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

    const classNames = cn("peer sr-only", className);

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
                  "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border bg-foundation",
                  statusStyles[status],
                  isChecked && "border-brand",
                  disabled && "disabled",
                )}
                onClick={disabled ? undefined : click}
                onKeyDown={disabled ? undefined : click}
              >
                <Circle
                  className={cn(
                    "h-4 w-4 text-brand opacity-0 transition-opacity",
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
                "ml-2 block cursor-pointer rounded font-medium text-base text-primary",
                "flex min-h-11 items-center",
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
            className={cn("mb-2 select-none text-xs", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

RadioOption.displayName = "RadioOption";
