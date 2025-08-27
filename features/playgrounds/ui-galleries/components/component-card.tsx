import { type HTMLAttributes, type ReactNode, memo } from "react";

import { cn } from "@/styles/functions";

import { CodeSnippet } from "./code-snippet";

/**
 * ComponentCardProps
 */
export type ComponentCardProps = {
  /** コンポーネントのタイトル */
  title: string;
  /** コンポーネントの説明 */
  description: string;
  /** サンプルコード */
  code: string;
  /** コードの言語 */
  language?: string;
  /** 表示するコンポーネント */
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * ComponentCard
 *
 * UIコンポーネントを展示するためのカードです。
 * コンポーネントのタイトル、説明、実際の表示、サンプルコードを含みます。
 */
export const ComponentCard = memo<ComponentCardProps>(
  ({ title, description, children, code, language, className, ...props }) => (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-outline bg-foundation shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="border-outline border-b p-4">
        <h3 className="mb-2 font-bold text-lg text-primary">{title}</h3>
        <p className="text-secondary text-sm">{description}</p>
      </div>

      <div className="border-outline border-b bg-foundation/50 p-6">
        <div className="flex items-center justify-center">{children}</div>
      </div>

      <div className="p-4">
        <CodeSnippet code={code} language={language} />
      </div>
    </div>
  ),
);

ComponentCard.displayName = "ComponentCard";
