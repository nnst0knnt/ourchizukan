"use client";

import { memo } from "react";

import TopLoader from "nextjs-toploader";

/**
 * TransitionProgress
 *
 * ページ遷移時に表示されるローディングバーを提供します。
 * ページの読み込み中にユーザーにフィードバックを提供するために使用されます。
 */
export const TransitionProgress = memo(() => (
  <TopLoader
    color="var(--color-brand)"
    height={6}
    showSpinner={false}
    easing="ease-out"
    speed={400}
    crawlSpeed={200}
    zIndex={2000}
  />
));

TransitionProgress.displayName = "TransitionProgress";
