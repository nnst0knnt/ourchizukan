"use client";

import { type HTMLAttributes, forwardRef } from "react";

import {
  CircleDashed,
  Glasses,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { IconButton } from "@/components/elements";
import { cn } from "@/styles/functions";

import { useAccessibility } from "./provider";

/**
 * AccessibilityControlsProps
 */
export type AccessibilityControlsProps = HTMLAttributes<HTMLDivElement>;

/**
 * AccessibilityControls
 *
 * アプリケーションの表示設定を調整するためのコントロールを提供します。
 * テーマ切替、コントラスト切替、文字サイズ調整など、ユーザーが自分に合った表示設定を選べるようにしています。
 */
export const AccessibilityControls = forwardRef<
  HTMLDivElement,
  AccessibilityControlsProps
>(({ className, ...props }, ref) => {
  const { theme, contrast, size } = useAccessibility();

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1 md:gap-2", className)}
      {...props}
    >
      <IconButton
        icon={!theme.value ? CircleDashed : theme.isLight ? Sun : Moon}
        size="small"
        kind="ghost"
        filled={theme.isDark}
        onClick={theme.toggle}
        aria-label={
          theme.isLight ? "ダークモードに変更する" : "ライトモードに変更する"
        }
      />

      <IconButton
        icon={Glasses}
        size="small"
        kind="ghost"
        filled={contrast.isHigh}
        onClick={contrast.toggle}
        aria-label={
          contrast.isNormal
            ? "高コントラストに変更する"
            : "通常コントラストに変更する"
        }
      />

      <IconButton
        icon={ZoomIn}
        size="small"
        kind="ghost"
        onClick={size.increase}
        disabled={size.isLarge}
        aria-label="文字を大きくする"
      />

      <IconButton
        icon={ZoomOut}
        size="small"
        kind="ghost"
        onClick={size.decrease}
        disabled={size.isSmall}
        aria-label="文字を小さくする"
      />
    </div>
  );
});

AccessibilityControls.displayName = "AccessibilityControls";
