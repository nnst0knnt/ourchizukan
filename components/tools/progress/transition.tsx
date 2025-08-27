"use client";

import { forwardRef } from "react";

import TopLoader, {
  type NextTopLoaderProps as TopLoaderProps,
} from "nextjs-toploader";

/**
 * TransitionProgress
 *
 * ページ遷移時に表示されるローディングバーを提供します。
 * ページの読み込み中にユーザーにフィードバックを提供するために使用されます。
 */
export const TransitionProgress = forwardRef<HTMLDivElement, TopLoaderProps>(
  (props, ref) => (
    <div ref={ref}>
      <TopLoader
        color="var(--color-brand)"
        height={6}
        showSpinner={false}
        easing="ease-out"
        speed={400}
        crawlSpeed={200}
        zIndex={2000}
        {...props}
      />
    </div>
  ),
);

TransitionProgress.displayName = "TransitionProgress";
