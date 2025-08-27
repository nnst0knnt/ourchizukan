"use client";

import {
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";

import { UIDimensions, useResize, useScroll } from "@/hooks";
import { cn } from "@/styles/functions";

import type { SelectSize, SelectStatus } from "./select-group";

/**
 * DesktopSelectGroupProps
 */
export type DesktopSelectGroupProps = {
  /** 開閉状態 */
  open: boolean;
  /** ID */
  id: string;
  /** 選択されたラベル */
  label: string;
  /** 選択された値 */
  value: string;
  /** セレクトのサイズ */
  size: SelectSize;
  /** セレクトの状態 */
  status: SelectStatus;
  /** グループを表す印 */
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  /** プレースホルダー */
  placeholder: string;
  /** 必須項目かどうか */
  required: boolean;
  /** クラス名 */
  className: string;
  /** aria-invalid属性 */
  ariaInvalid: boolean;
  /** aria-describedby属性 */
  ariaDescribedBy: string;
  /** 選択肢 */
  children: ReactNode;
  /** 開閉を切り替えるハンドラー */
  toggle: () => void;
};

/**
 * DesktopSelectGroup
 *
 * デスクトップ向けに複数の選択肢をグループ化します。
 * ドロップダウン形式で選択肢を表示します。
 */
export const DesktopSelectGroup = ({
  open,
  id,
  label,
  value,
  size = "default",
  status,
  mark: Mark,
  placeholder,
  required,
  className,
  ariaInvalid,
  ariaDescribedBy,
  children,
  toggle,
}: DesktopSelectGroupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPositionedAbove, setIsPositionedAbove] = useState(false);

  const adjust = useCallback(() => {
    const element = containerRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    const availableSpaceBelow = viewportHeight - elementBottom;

    const dropdownHeight = UIDimensions.SelectDropdownMaxHeight;
    const safetyMargin = UIDimensions.BottomSafetyMargin;

    setIsPositionedAbove(availableSpaceBelow < dropdownHeight + safetyMargin);
  }, []);

  useResize(adjust);

  useScroll(adjust);

  const listboxId = `${id}-listbox`;

  const statusStyles = {
    default: "border-outline",
    success: "border-success",
    error: "border-error",
  };

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

  const classNames = cn(
    "flex items-center justify-between w-full rounded-md border bg-foundation text-primary",
    sizeStyles[size],
    statusStyles[status],
    Mark && paddingsStyles[size],
    open && "focused",
    className,
  );

  return (
    <div className="relative" ref={containerRef}>
      {Mark && (
        <div className={cn("-translate-y-1/2 absolute", markStyles[size])}>
          <Mark
            className={cn("text-secondary", markStyles[size])}
            aria-hidden="true"
          />
        </div>
      )}

      <input
        id={id}
        type="text"
        className="sr-only"
        readOnly
        aria-required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        value={value}
      />

      <button
        type="button"
        className={classNames}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={toggle}
      >
        <span className={cn("truncate", !value && "text-secondary/70")}>
          {label || placeholder}
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-secondary" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-secondary" aria-hidden="true" />
        )}
      </button>

      <div
        className={cn(
          "absolute z-10 w-full rounded-md border border-outline bg-foundation shadow-lg",
          "transition-all duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
          isPositionedAbove ? "bottom-full mb-2" : "top-full mt-2",
        )}
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={id}
      >
        <div className="max-h-80 overflow-hidden overflow-y-auto rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
