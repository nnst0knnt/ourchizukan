"use client";

import {
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  createContext,
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";

import { useResponsive } from "@/hooks";
import { cn } from "@/styles/functions";

import { DesktopSelectGroup } from "./desktop-select-group";
import { MobileSelectGroup } from "./mobile-select-group";

import type { LucideIcon } from "lucide-react";

/**
 * セレクトのサイズ
 */
export type SelectSize = "default" | "large";

/**
 * セレクトの状態
 */
export type SelectStatus = "default" | "error" | "success";

/**
 * セレクトグループの状態
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
type SelectGroupProps = {
  /** グループのラベル */
  label?: string;
  /** 選択された値 */
  value?: string;
  /** セレクトのサイズ */
  size?: SelectSize;
  /** グループのヘルプテキスト */
  helperText?: string;
  /** エラーメッセージ */
  error?: string;
  /** 成功メッセージ */
  success?: string;
  /** グループを表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** プレースホルダー */
  placeholder?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 横幅いっぱいに広げるかどうか */
  fullWidth?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 値が変更されたときのハンドラー */
  onChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

/**
 * SelectGroup
 *
 * 複数の選択肢をグループ化します。
 * ドロップダウンで選択肢を表示し、選択することができます。
 * セレクトボックスの状態を管理するために、SelectOptionと組み合わせて使用します。
 *
 * デスクトップでは通常のドロップダウン表示、モバイルではボトムシートとして表示されます。
 * 画面下部での使用時には自動的に上方向に表示される機能を備えています。
 */
export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  (
    {
      label = "",
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      value = "",
      placeholder = "選択してください",
      required = false,
      fullWidth = false,
      children,
      className = "",
      "aria-describedby": ariaDescribedBy = "",
      onChange,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<{ label: string; value: string }>({
      label: "",
      value,
    });

    useClickAway(containerRef, () => open && setOpen(false));

    const { isMobile } = useResponsive();

    const defaultId = useId();

    const groupId = `select-group-${defaultId}`;

    const messageId = `${groupId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: SelectStatus = hasError
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
        {label && (
          <div className="flex items-center">
            <label
              htmlFor={groupId}
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

        <div className="size-full" ref={containerRef}>
          <SelectGroupState.Provider
            value={{
              value: selected.value,
              open,
              size,
              change,
              toggle,
            }}
          >
            {isMobile ? (
              <MobileSelectGroup
                open={open}
                id={groupId}
                name={label}
                label={selected.label}
                value={selected.value}
                size={size}
                status={status}
                mark={Mark}
                placeholder={placeholder}
                required={required}
                className={className}
                ariaInvalid={hasError}
                ariaDescribedBy={messageId || ariaDescribedBy}
                toggle={toggle}
              >
                {children}
              </MobileSelectGroup>
            ) : (
              <DesktopSelectGroup
                open={open}
                id={groupId}
                label={selected.label}
                value={selected.value}
                size={size}
                status={status}
                mark={Mark}
                placeholder={placeholder}
                required={required}
                className={className}
                ariaInvalid={hasError}
                ariaDescribedBy={messageId || ariaDescribedBy}
                toggle={toggle}
              >
                {children}
              </DesktopSelectGroup>
            )}
          </SelectGroupState.Provider>
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
