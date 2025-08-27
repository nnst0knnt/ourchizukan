"use client";

import {
  type ChangeEvent,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useId,
  useState,
} from "react";

import { cn } from "@/styles/functions";

import type { CheckboxStatus } from "./checkbox";

/**
 * チェックボックスグループ内の選択状態
 */
export const CheckedValues = createContext<string[]>([]);

/**
 * CheckboxGroupProps
 */
export type CheckboxGroupProps = {
  /** グループのラベル */
  label?: string;
  /** グループのヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 値が変更されたときのハンドラー */
  onChange?: (value: string[]) => void;
} & HTMLAttributes<Omit<HTMLFieldSetElement, "onChange">>;

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
      helperText,
      error,
      success,
      required,
      className,
      children,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

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

    const change = useCallback(
      (e: ChangeEvent<HTMLFieldSetElement>) => {
        const checkedValues = Array.from(
          e.currentTarget.querySelectorAll("input:checked"),
        )
          .map((input) =>
            input instanceof HTMLInputElement ? input.value : null,
          )
          .filter((value) => value !== null);

        if (onChange) {
          onChange(checkedValues);
        }

        setCheckedValues(checkedValues);
      },
      [onChange],
    );

    return (
      <fieldset
        ref={ref}
        className={cn("flex flex-col gap-1", className)}
        aria-required={required}
        aria-describedby={message ? messageId : undefined}
        aria-invalid={hasError}
        onChange={change}
        {...props}
      >
        {label && (
          <legend
            id={legendId}
            className="mb-1 font-medium text-base text-primary"
          >
            {label}
            {required && <span className="mt-1 ml-1 text-error">*</span>}
          </legend>
        )}

        <CheckedValues.Provider value={checkedValues}>
          <div className="flex flex-col rounded-s border-brand/50 border-l-4 pl-2">
            {children}
          </div>
        </CheckedValues.Provider>

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
