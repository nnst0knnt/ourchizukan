"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { Glasses, Moon, Sun, ZoomIn, ZoomOut } from "lucide-react";

import { useContrast, useSize, useTheme } from "@/hooks";
import { cn } from "@/styles/functions";

import { Mark } from "../../elements/trigger";

/**
 * AccessibilityControlsProps
 */
export type AccessibilityControlsProps = HTMLAttributes<HTMLDivElement>;

/**
 * AccessibilityControls
 *
 * アプリケーションの表示設定を調整するためのコントロールを提供します。
 * テーマ切り替え、コントラスト切り替え、文字サイズ調整など、ユーザーが自分に合った表示設定を選べるようにしています。
 */
export const AccessibilityControls = forwardRef<
  HTMLDivElement,
  AccessibilityControlsProps
>(({ className, ...props }, ref) => {
  const theme = useTheme();
  const contrast = useContrast();
  const size = useSize();

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1 md:gap-2", className)}
      {...props}
    >
      <Mark
        value={!theme.value ? null : theme.isLight ? Sun : Moon}
        size="small"
        kind="ghost"
        onClick={theme.toggle}
        aria-label={
          theme.isLight ? "ダークモードに変更する" : "ライトモードに変更する"
        }
        role="switch"
      />

      <Mark
        value={Glasses}
        size="small"
        kind="ghost"
        onClick={contrast.toggle}
        aria-label={
          contrast.isNormal
            ? "高コントラストに変更する"
            : "通常コントラストに変更する"
        }
        role="switch"
      />

      <Mark
        value={ZoomIn}
        size="small"
        kind="ghost"
        filled={size.isLarge}
        onClick={size.increase}
        disabled={size.isLarge}
        aria-label="文字を大きくする"
        role="button"
      />

      <Mark
        value={ZoomOut}
        size="small"
        kind="ghost"
        filled={size.isSmall}
        onClick={size.decrease}
        disabled={size.isSmall}
        aria-label="文字を小さくする"
        role="button"
      />
    </div>
  );
});

AccessibilityControls.displayName = "AccessibilityControls";
