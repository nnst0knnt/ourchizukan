"use client";

import { useForwardedRef, usePullToRefresh } from "@/hooks";
import { date } from "@/services/date";
import { sleep } from "@/services/timer";
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
import { createPortal } from "react-dom";

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

enum Status {
  /** 初期状態 */
  Idle = "idle",
  /** リフレッシュ中 */
  Refreshing = "refreshing",
  /** リフレッシュ完了 */
  Refreshed = "refreshed",
}

/**
 * PullToRefreshProps
 */
type PullToRefreshProps = {
  /** リフレッシュに必要な引き下げ距離（ピクセル） */
  threshold?: number;
  /** 誤動作防止の最小距離（ピクセル） */
  deadzone?: number;
  /** リフレッシュ発動に必要な保持時間（ミリ秒） */
  holdTime?: number;
  /** リフレッシュUIを適用する要素のセレクタ（relativeである必要がある） */
  selector?: string;
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
    {
      threshold = 50,
      deadzone = 5,
      holdTime = 500,
      onRefresh,
      selector = "main",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { enabled } = usePullToRefresh();
    const containerRef = useForwardedRef(ref);
    const selectorRef = useRef<HTMLElement | null>(null);

    const [distance, setDistance] = useState(0);
    const [status, setStatus] = useState<Status>(Status.Idle);
    const [isActive, setIsActive] = useState(false);
    const [mounted, setMounted] = useState(false);

    const startY = useRef(0);
    const moveY = useRef(0);
    const startMs = useRef(0);

    const refresh = useCallback(async () => {
      if (status !== Status.Idle) return;

      setStatus(Status.Refreshing);

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
        setStatus(Status.Refreshed);
        setDistance(0);

        await sleep(500);

        setStatus(Status.Idle);
      }
    }, [onRefresh, status]);

    const reset = useCallback(() => {
      setDistance(0);
      setIsActive(false);
      setStatus(Status.Idle);
      startY.current = 0;
      moveY.current = 0;
      startMs.current = 0;
    }, []);

    const start = useCallback(
      (e: TouchEvent) => {
        e.stopPropagation();

        const element = selectorRef.current;

        if (!element) return;

        /**
         * コンテンツ領域の最上部にいて、かつリフレッシュ中でない場合のみ開始位置を記録
         */
        if (element.scrollTop <= 0 && status === Status.Idle) {
          startY.current = e.touches[0].clientY;
          startMs.current = date().valueOf();
        }
      },
      [status],
    );

    const move = useCallback(
      (e: TouchEvent) => {
        e.stopPropagation();

        const element = selectorRef.current;

        if (!element) return;

        /** プルダウン中でない場合、または要素が最上部にない場合は無視 */
        if (
          startY.current === 0 ||
          status !== Status.Idle ||
          element.scrollTop > 0 ||
          date().valueOf() - startMs.current < holdTime
        )
          return;

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
      [status, holdTime, deadzone, threshold],
    );

    const end = useCallback(() => {
      if (status !== Status.Idle) return;

      /** 保持時間を満たさない場合はリセット */
      if (date().valueOf() - startMs.current < holdTime) {
        reset();
        return;
      }

      if (distance >= threshold) {
        refresh();
      } else {
        reset();
      }
    }, [distance, holdTime, refresh, reset, status, threshold]);

    useEffect(() => {
      if (!enabled) return;

      const element = document.querySelector(selector) as HTMLElement;

      if (element) {
        selectorRef.current = element;

        setMounted(true);
      }
    }, [enabled, selector]);

    useEffect(() => {
      if (!enabled) return;

      const element = selectorRef.current;

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
    }, [enabled, end, move, start]);

    return (
      <>
        {enabled &&
          mounted &&
          selectorRef.current &&
          createPortal(
            <div
              ref={containerRef}
              className={cn(
                "absolute top-0 right-0 left-0 z-cover flex flex-col items-center justify-center bg-foundation/95",
                "overflow-hidden transition-all duration-200",
                className,
              )}
              style={{
                height:
                  status === Status.Refreshing
                    ? `calc(${Dimensions.RefreshHeight}px + 1.5rem)`
                    : distance > 0
                      ? `${Math.min(
                          distance * Dimensions.HeightRatio,
                          Dimensions.MaxHeight,
                        )}px`
                      : "0px",
                opacity: distance > 0 || status === Status.Refreshing ? 1 : 0,
              }}
              {...props}
            >
              {status === Status.Refreshing ? (
                <div className="flex flex-col items-center justify-center p-2 text-primary">
                  <RotateCw className="mb-2 h-6 w-6 animate-spin" />
                  <span className="font-bold text-sm">読み込み中</span>
                </div>
              ) : status === Status.Idle ? (
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
              ) : null}
            </div>,
            selectorRef.current,
          )}
        {children}
      </>
    );
  },
);

PullToRefresh.displayName = "PullToRefresh";
