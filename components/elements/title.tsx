import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { cn } from "@/styles/functions";

/**
 * TitleProps
 */
export type TitleProps = {
  /** アクセシブルな見出しレベル (デフォルトはh1) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** アクセント下線を表示するかどうか */
  accented?: boolean;
  /** タイトルを表す印 */
  mark?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

/**
 * Title
 *
 * ページや各セクションのタイトルを表示するコンポーネントです。
 * 見出しレベルによってスタイルが変わります。
 */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      children,
      as: Component = "h1",
      accented = false,
      mark,
      className,
      ...props
    },
    ref,
  ) => {
    const levelStyles = {
      h1: "text-3xl md:text-4xl font-extrabold",
      h2: "text-2xl md:text-3xl font-bold",
      h3: "text-xl md:text-2xl font-semibold",
      h4: "text-lg md:text-xl font-medium",
      h5: "text-base md:text-lg font-medium",
      h6: "text-sm md:text-base font-medium",
    }[Component];

    const classNames = cn(
      "tracking-tight text-primary",
      levelStyles,
      mark && "flex items-center justify-between gap-2",
      className,
    );

    return (
      <div className="flex flex-col">
        <Component ref={ref} className={classNames} {...props}>
          {accented ? (
            <span className="relative inline-flex items-center">
              <span className="relative z-10">{children}</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-16 rounded-sm bg-brand opacity-20" />
            </span>
          ) : (
            children
          )}
          {mark && mark}
        </Component>
      </div>
    );
  },
);

Title.displayName = "Title";
