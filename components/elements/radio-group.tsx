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

import type { RadioOptionStatus } from "./radio-option";

/**
 * ラジオグループ内の選択状態
 */
export const SelectedValue = createContext<string>("");

/**
 * RadioGroupProps
 */
export type RadioGroupProps = {
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
  /** 現在の選択値 */
  value?: string;
  /** 値が変更されたときのハンドラー */
  onChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue">;

/**
 * RadioGroup
 *
 * 複数のラジオボタンをグループ化します。
 * ラジオボタンの選択状態を管理するために、RadioOptionと組み合わせて使用します。
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      required,
      className,
      children,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(
      value !== undefined ? value : "",
    );

    const defaultId = useId();

    const groupId = `radio-group-${defaultId}`;

    const legendId = `${groupId}-legend`;

    const messageId = `${groupId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: RadioOptionStatus = hasError
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
        const radio = e.target as unknown as HTMLInputElement;

        if (!radio) return;

        if (onChange) {
          onChange(radio.value);
        }

        setSelectedValue(radio.value);
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
        role="radiogroup"
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

        <SelectedValue.Provider value={selectedValue}>
          <div className="flex flex-col rounded-s border-brand/50 border-l-4 pl-2">
            {children}
          </div>
        </SelectedValue.Provider>

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

RadioGroup.displayName = "RadioGroup";
