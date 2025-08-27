"use client";

import { useForwardedRef } from "@/hooks";
import { cn } from "@/styles/functions";
import { ArrowDown, RotateCw } from "lucide-react";
import {
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const Dimensions = {
  /** 抵抗が切り替わる距離 */
  Break: 50,
  /** リフレッシュ時の高さ */
  RefreshHeight: 60,
  /** 最大の高さ */
  MaxHeight: 100,
  /** 距離に対する高さの比率 */
  HeightRatio: 1.5,
} as const;

const Resistances = {
  /** 初期抵抗（85%） */
  Default: 0.85,
  /** 強抵抗（20%） */
  Strong: 0.2,
} as const;

/**
 * PullToRefreshProps
 */
type PullToRefreshProps = {
  /** リフレッシュに必要な引き下げ距離（ピクセル） */
  threshold?: number;
  /** 誤動作防止の最小距離（ピクセル） */
  deadzone?: number;
  /** リフレッシュしたときのハンドラー */
  onRefresh?: () => Promise<void>;
} & HTMLAttributes<HTMLDivElement>;

/**
 * PullToRefresh
 *
 * コンテンツをプルダウンしてリフレッシュする機能を提供します。
 * onRefreshが省略された場合は、ページの再読み込みを行います。
 */
export const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  (
    { threshold = 50, deadzone = 5, onRefresh, className, children, ...props },
    ref,
  ) => {
    const containerRef = useForwardedRef(ref);

    const [distance, setDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const startY = useRef(0);
    const moveY = useRef(0);

    const refresh = useCallback(async () => {
      if (isRefreshing) return;

      setIsRefreshing(true);

      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          /** デフォルトでページを再読み込み */
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsRefreshing(false);
        setDistance(0);
      }
    }, [isRefreshing, onRefresh]);

    const reset = useCallback(() => {
      setDistance(0);
      setIsActive(false);
    }, []);

    const start = useCallback(
      (e: TouchEvent) => {
        /** ページが最上部にあり、リフレッシュ中でない場合のみ開始位置を記録 */
        if (window.scrollY === 0 && !isRefreshing) {
          startY.current = e.touches[0].clientY;
        }
      },
      [isRefreshing],
    );

    const move = useCallback(
      (e: TouchEvent) => {
        if (startY.current === 0 || isRefreshing) return;

        moveY.current = e.touches[0].clientY;
        let difference = moveY.current - startY.current;

        /** 誤動作防止のため、deadzone以下の動きは無視 */
        if (difference <= deadzone) return;

        if (difference > 0) {
          /** デッドゾーンを除いた引き下げ距離 */
          difference = difference - deadzone;

          /**
           * 抵抗計算
           *
           * - 最初の50pxまでは実際の動きの85%
           * - それ以降は動きの20%（大きく引いても少ししか動かない）
           */
          let distance: number;
          if (difference <= Dimensions.Break) {
            distance = difference * Resistances.Default;
          } else {
            distance =
              Dimensions.Break * Resistances.Default +
              (difference - Dimensions.Break) * Resistances.Strong;
          }

          setDistance(distance);
          setIsActive(distance >= threshold);

          e.preventDefault();
        }
      },
      [isRefreshing, deadzone, threshold],
    );

    const end = useCallback(() => {
      if (distance >= threshold && !isRefreshing) {
        refresh();
      } else {
        reset();
      }

      startY.current = 0;
      moveY.current = 0;
    }, [distance, isRefreshing, refresh, reset, threshold]);

    useEffect(() => {
      const element = containerRef.current;

      if (!element) return;

      /** ユーザー操作によるスクロールを無効化 */
      const options = { passive: false };

      element.addEventListener("touchstart", start, options);
      element.addEventListener("touchmove", move, options);
      element.addEventListener("touchend", end);

      return () => {
        element.removeEventListener("touchstart", start);
        element.removeEventListener("touchmove", move);
        element.removeEventListener("touchend", end);
      };
    }, [containerRef, end, move, start]);

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <div
          className={cn(
            "absolute top-0 right-0 left-0 z-10 flex flex-col items-center justify-center bg-foundation/95",
            "overflow-hidden transition-all duration-200",
          )}
          style={{
            height: isRefreshing
              ? `${Dimensions.RefreshHeight}px`
              : distance > 0
                ? `${Math.min(
                    distance * Dimensions.HeightRatio,
                    Dimensions.MaxHeight,
                  )}px`
                : "0px",
            opacity: distance > 0 || isRefreshing ? 1 : 0,
          }}
        >
          {isRefreshing ? (
            <div className="flex flex-col items-center justify-center p-2 text-primary">
              <RotateCw className="mb-2 h-6 w-6 animate-spin" />
              <span className="mb-2 font-bold text-sm">読み込み中</span>
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center p-2 text-secondary",
                "transition-opacity",
                distance > 0 ? "opacity-100" : "opacity-0",
              )}
            >
              {isActive ? (
                <RotateCw className="mb-2 h-6 w-6 animate-spin" />
              ) : (
                <ArrowDown className="h-6 w-6 animate-bounce" />
              )}
              <span className="font-bold text-sm">
                {isActive ? "指を離して更新" : "もう少し下へ"}
              </span>
            </div>
          )}
        </div>
        <div className="relative">{children}</div>
      </div>
    );
  },
);

PullToRefresh.displayName = "PullToRefresh";
