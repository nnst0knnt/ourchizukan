"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  memo,
  useCallback,
  useState,
} from "react";

import { Check, Clipboard } from "lucide-react";

import { Description, Title } from "@/components/elements/typography";
import { cn } from "@/styles/functions";

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
  ({
    title,
    description,
    children,
    code,
    language = "tsx",
    className,
    ...props
  }) => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async () => {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
      <div
        className={cn(
          "rounded-lg border border-outline bg-foundation shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex h-32 flex-col gap-1.5 rounded-t-lg border-outline border-b bg-foundation p-5">
          <Title as="h3">{title}</Title>
          <Description size="small">
            <p>{description}</p>
          </Description>
        </div>

        <div className="flex h-58 items-center justify-center bg-foundation/30 px-6 py-8">
          {children}
        </div>

        <div className="rounded-b-lg bg-primary/5">
          <div className="flex items-center justify-between bg-primary/10 px-4 py-2">
            <span className="text-primary text-xs">{language}</span>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md p-1 text-secondary hover:bg-primary/15 hover:text-primary"
              onClick={copy}
              aria-label="コードをコピー"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
              <span className="text-xs">
                {copied ? "コピーしました" : "コピー"}
              </span>
            </button>
          </div>

          <div className="size-full h-48 overflow-hidden">
            <div className="size-full overflow-auto p-4">
              <div className="whitespace-pre-wrap text-primary">{code}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ComponentCard.displayName = "ComponentCard";
