"use client";

import {
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";

import { Check } from "lucide-react";

import { cn } from "@/styles/functions";

import { SelectGroupState } from "./select-group";

/**
 * SelectOptionProps
 */
export type SelectOptionProps = {
  /** オプションの値 */
  value: string;
  /** オプションのラベル */
  label: string;
  /** 無効状態かどうか */
  disabled?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "value">;

/**
 * SelectOption
 *
 * セレクトボックスの選択肢を表示するコンポーネントです。
 * SelectGroupと組み合わせて使用することでセレクトボックスを制御することができます。
 */
export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ value, label, disabled = false, className, children, ...props }, ref) => {
    const state = useContext(SelectGroupState);

    const isSelected = state.value === value;

    const sizeStyles = {
      default: "py-2 px-4 text-base",
      large: "py-3 px-5 text-lg",
    };

    const classNames = cn(
      "flex cursor-pointer select-none items-center justify-between",
      "hover:bg-primary/10 active:bg-primary/10 transition-all duration-200",
      sizeStyles[state.size],
      isSelected ? "bg-brand/10 text-primary" : "text-primary",
      disabled && "disabled",
      className,
    );

    const select = useCallback(() => {
      if (disabled) return;

      state.change(value, label || "");
    }, [disabled, label, state, value]);

    return (
      <div
        ref={ref}
        className={classNames}
        role="option"
        tabIndex={-1}
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={select}
        {...props}
      >
        <span>{label || children}</span>
        {isSelected && (
          <Check className="h-4 w-4 text-brand" aria-hidden="true" />
        )}
      </div>
    );
  },
);

SelectOption.displayName = "SelectOption";
