import {
  type ChangeEvent,
  type InputHTMLAttributes,
  forwardRef,
  useCallback,
  useId,
} from "react";

import { Check } from "lucide-react";

import { cn } from "@/styles/functions";

/**
 * 入力欄の状態
 */
type InputStatus = "default" | "error" | "success";

/**
 * CheckboxProps
 */
export type CheckboxProps = {
  /** チェックボックスのラベル */
  label?: string;
  /** チェックされているかどうか */
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
 * Checkbox
 *
 * アクセシビリティに配慮したチェックボックスコンポーネントです。
 * 単独で使用することも、CheckboxGroupと組み合わせて使用することもできます。
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
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
      if (onChange) {
        onChange(!checked);
      }
    }, [onChange, checked]);

    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex h-11 items-center">
            <div className="relative flex items-center">
              <input
                ref={ref}
                type="checkbox"
                id={inputId}
                checked={checked}
                disabled={disabled}
                required={required}
                className={classNames}
                aria-invalid={hasError}
                aria-describedby={message ? messageId : ariaDescribedBy}
                onChange={change}
                {...props}
              />
              <div
                className={cn(
                  "flex h-6 w-6 cursor-pointer items-center justify-center rounded border bg-foundation",
                  "transition-colors duration-200",
                  statusStyles[status],
                  checked && "border-brand bg-brand",
                )}
                onClick={click}
                onKeyDown={click}
              >
                <Check
                  className={cn(
                    "h-4 w-4 text-foreground opacity-0 transition-opacity",
                    checked && "opacity-100",
                  )}
                  aria-hidden="true"
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
            className={cn("select-none pl-8 text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
