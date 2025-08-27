"use client";

import { type HTMLAttributes, memo, useCallback, useState } from "react";

import { Check, Clipboard } from "lucide-react";

import { cn } from "@/styles/functions";

/**
 * CodeSnippetProps
 */
export type CodeSnippetProps = {
  /** コードの内容 */
  code: string;
  /** コードの言語 */
  language?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * CodeSnippet
 *
 * コードのスニペットを表示します。
 * コピー機能も備えています。
 */
export const CodeSnippet = memo<CodeSnippetProps>(
  ({ code, language = "tsx", className, ...props }) => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async () => {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
      <div
        className={cn(
          "relative rounded-md bg-primary/5 font-mono text-primary text-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between rounded-t-md bg-primary/10 px-4 py-2">
          <span className="text-xs">{language}</span>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md p-1 text-secondary hover:bg-primary/10 hover:text-primary"
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
        <pre className="overflow-x-auto p-4">
          <code>{code}</code>
        </pre>
      </div>
    );
  },
);

CodeSnippet.displayName = "CodeSnippet";
