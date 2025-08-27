"use client";

import { type JSX, memo, useCallback, useEffect, useState } from "react";

import { type BundledLanguage, codeToHtml } from "shiki";

import { cn } from "@/styles/functions";

const light = "github-light";
const dark = "one-dark-pro";

/**
 * CodeSnippetProps
 */
type CodeSnippetProps = {
  code: string;
  language: BundledLanguage;
  className?: string;
};

/**
 * CodeSnippet
 *
 * コンポーネント使用例のコードを展示します。
 */
export const CodeSnippet = memo<CodeSnippetProps>(
  ({ code, language = "tsx", className }) => {
    const [snippet, setSnippet] = useState<JSX.Element | null>(null);

    const toHtml = useCallback(async () => {
      try {
        const out = await codeToHtml(code, {
          lang: language,
          themes: {
            light,
            dark,
          },
        });

        setSnippet(
          <div
            className={cn("size-full", className)}
            /* biome-ignore lint/security/noDangerouslySetInnerHtml: https://biomejs.dev/ja/linter/rules/no-dangerously-set-inner-html */
            dangerouslySetInnerHTML={{ __html: out }}
          />,
        );
      } catch (e) {
        console.error(e);

        setSnippet(
          <pre
            className={`${className} overflow-auto whitespace-pre p-4 text-primary`}
          >
            <code>{code}</code>
          </pre>,
        );
      }
    }, [className, code, language]);

    useEffect(() => {
      toHtml();
    }, [toHtml]);

    return snippet;
  },
);

CodeSnippet.displayName = "CodeSnippet";
