import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/styles/functions";

/**
 * 説明文のサイズ
 */
type DescriptionSize = "small" | "default" | "large";

/**
 * DescriptionProps
 */
type DescriptionProps = {
  /** 説明文のサイズ */
  size?: DescriptionSize;
  /** 最大幅を設定するかどうか */
  maxWidth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Description
 *
 * サイズに応じた説明文を表示します。
 * 主にタイトルの下に表示される補足情報や説明を提供します。
 */
export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (
    { children, size = "default", maxWidth = true, className, ...props },
    ref,
  ) => {
    const sizeStyles = {
      small: "text-sm md:text-base",
      default: "text-base md:text-lg",
      large: "text-lg md:text-xl",
    };

    const classNames = cn(
      "flex flex-col gap-2 text-secondary",
      sizeStyles[size],
      maxWidth && "max-w-2xl",
      className,
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);

Description.displayName = "Description";
