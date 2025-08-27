"use client";

import {
  type ChangeEvent,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  createContext,
  forwardRef,
  useCallback,
  useId,
  useState,
} from "react";

import { cn } from "@/styles/functions";

import type { CheckboxStatus } from "./checkbox-option";
import type { LucideIcon } from "lucide-react";

/**
 * チェックボックスのサイズ
 */
export type CheckboxSize = "default" | "large";

/**
 * チェックボックスグループの状態
 */
export const CheckboxGroupState = createContext<{
  value: string[];
  size: CheckboxSize;
}>({
  value: [],
  size: "default",
});

/**
 * CheckboxGroupProps
 */
export type CheckboxGroupProps = {
  /** グループのラベル */
  label?: string;
  /** チェックボックスのサイズ */
  size?: CheckboxSize;
  /** グループのヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** グループを表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** 現在の選択値 */
  value?: string | string[];
  /** 必須項目かどうか */
  required?: boolean;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 値が変更されたときのハンドラー */
  onChange?: (value: string[]) => void;
} & Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue">;

/**
 * CheckboxGroup
 *
 * 複数のチェックボックスをグループ化します。
 * チェックボックスの選択状態を管理するために、Checkboxと組み合わせて使用します。
 */
export const CheckboxGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxGroupProps
>(
  (
    {
      label,
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      value = "",
      required,
      fullWidth = false,
      children,
      className,
      "aria-describedby": ariaDescribedBy,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = useState<string[]>(
      Array.isArray(value) ? value : [value],
    );

    const defaultId = useId();

    const groupId = `checkbox-group-${defaultId}`;

    const legendId = `${groupId}-legend`;

    const messageId = `${groupId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: CheckboxStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const sizeStyles = {
      default: "text-base",
      large: "text-lg",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2 mr-2",
      large: "h-6 w-6 stroke-2 mr-2",
    };

    const change = useCallback(
      (e: ChangeEvent<HTMLFieldSetElement>) => {
        const checked = Array.from(
          e.currentTarget.querySelectorAll("input:checked"),
        )
          .map((input) =>
            input instanceof HTMLInputElement ? input.value : null,
          )
          .filter((value) => value !== null);

        if (onChange) {
          onChange(checked);
        }

        setSelected(checked);
      },
      [onChange],
    );

    return (
      <fieldset
        ref={ref}
        className={cn(
          "flex flex-col gap-1",
          fullWidth ? "w-full" : "",
          className,
        )}
        aria-describedby={message ? messageId : ariaDescribedBy}
        onChange={change}
        {...props}
      >
        {label && (
          <legend
            id={legendId}
            className={cn(
              "mb-2 flex items-center font-medium text-primary",
              sizeStyles[size],
            )}
          >
            {Mark && <Mark className={markStyles[size]} aria-hidden="true" />}
            {label}
            {required && <span className="mt-1 ml-1 text-error">*</span>}
          </legend>
        )}

        <CheckboxGroupState.Provider
          value={{
            value: selected,
            size,
          }}
        >
          <div className="flex flex-col rounded-s border-brand/50 border-l-4 pb-2 pl-2">
            {children}
          </div>
        </CheckboxGroupState.Provider>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 select-none text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </fieldset>
    );
  },
);

CheckboxGroup.displayName = "CheckboxGroup";
