"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";

import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";

import { cn } from "@/styles/functions";

/**
 * セレクトのサイズ
 */
type SelectSize = "default" | "large";

/**
 * セレクトの状態
 */
type SelectStatus = "default" | "error" | "success";

/**
 * セレクト内の選択状態
 */
export const SelectGroupState = createContext<{
  value: string;
  open: boolean;
  size: SelectSize;
  change: (value: string, label: string) => void;
  toggle: () => void;
}>({
  value: "",
  open: false,
  size: "default",
  change: () => {},
  toggle: () => {},
});

/**
 * SelectGroupProps
 */
export type SelectGroupProps = {
  /** グループのラベル */
  label?: string;
  /** セレクトのサイズ */
  size?: SelectSize;
  /** グループのヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** セレクトを表す印 */
  mark?: LucideIcon;
  /** プレースホルダー */
  placeholder?: string;
  /** 選択された値 */
  value?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 値が変更されたときのハンドラー */
  onChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;

/**
 * SelectGroup
 *
 * 複数の選択肢から一つを選択するセレクトボックスです。
 * ドロップダウンで選択肢を表示し、選択することができます。
 * セレクトボックスの状態を管理するために、SelectOptionと組み合わせて使用します。
 */
export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
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
      placeholder = "選択してください",
      value = "",
      required,
      fullWidth = false,
      children,
      "aria-describedby": ariaDescribedBy,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<{ label: string; value: string }>({
      label: "",
      value,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    useClickAway(containerRef, () => open && setOpen(false));

    const defaultId = useId();

    const selectId = id || defaultId;

    const messageId = `${selectId}-message`;

    const listboxId = `${selectId}-listbox`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: SelectStatus = hasError
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
      "flex items-center justify-between w-full rounded-md border bg-foundation text-primary",
      sizeStyles[size],
      statusStyles[status],
      Mark && paddingsStyles[size],
      open && "focused",
      className,
    );

    const change = useCallback(
      (value: string, label: string) => {
        if (onChange) {
          onChange(value);
        }

        setSelected({ label, value });

        setOpen(false);
      },
      [onChange],
    );

    const toggle = useCallback(() => setOpen((previous) => !previous), []);

    return (
      <div
        className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-fit")}
        ref={ref}
        {...props}
      >
        <div className="size-full" ref={containerRef}>
          {label && (
            <div className="mb-1 flex items-center">
              <label
                htmlFor={selectId}
                className={cn(
                  "flex size-full items-center font-medium text-primary",
                  size === "large" ? "text-lg" : "text-base",
                )}
                onClick={toggle}
                onKeyDown={toggle}
              >
                {label}
                {required && <span className="mt-1 ml-1 text-error">*</span>}
              </label>
            </div>
          )}

          <div className="relative">
            {Mark && (
              <div
                className={cn("-translate-y-1/2 absolute", markStyles[size])}
              >
                <Mark
                  className={cn("text-secondary", markStyles[size])}
                  aria-hidden="true"
                />
              </div>
            )}

            <input
              id={selectId}
              type="text"
              className="sr-only"
              readOnly
              aria-required={required}
              aria-invalid={hasError}
              aria-describedby={message ? messageId : ariaDescribedBy}
              value={selected.value}
            />

            <button
              type="button"
              className={classNames}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              onClick={toggle}
            >
              <span
                className={cn(
                  "truncate",
                  !selected.value && "text-secondary/70",
                )}
              >
                {selected.label || placeholder}
              </span>
              {open ? (
                <ChevronUp
                  className="h-5 w-5 text-secondary"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDown
                  className="h-5 w-5 text-secondary"
                  aria-hidden="true"
                />
              )}
            </button>

            <SelectGroupState.Provider
              value={{
                value: selected.value,
                open,
                size,
                change,
                toggle,
              }}
            >
              <div
                className={cn(
                  "absolute z-10 mt-2 w-full rounded-md border border-outline bg-foundation shadow-lg",
                  open ? "block" : "hidden",
                )}
                id={listboxId}
                role="listbox"
                tabIndex={-1}
                aria-labelledby={label ? selectId : undefined}
              >
                <div className="overflow-hidden overflow-y-auto rounded-md">
                  {children}
                </div>
              </div>
            </SelectGroupState.Provider>
          </div>
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 select-none text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

SelectGroup.displayName = "SelectGroup";
