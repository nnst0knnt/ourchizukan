"use client";

import { type JSX, memo, useCallback, useEffect, useState } from "react";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { cn } from "@/styles/functions";

let _highlighter: HighlighterCore | null = null;

const highlighter = async () => {
  if (!_highlighter) {
    _highlighter = await createHighlighterCore({
      themes: [
        import("@shikijs/themes/github-light"),
        import("@shikijs/themes/one-dark-pro"),
      ],
      langs: [import("@shikijs/langs/tsx")],
      engine: createJavaScriptRegexEngine(),
    });
  }

  return _highlighter;
};

type CodeSnippetProps = {
  code: string;
  language?: "tsx";
  className?: string;
};

export const CodeSnippet = memo<CodeSnippetProps>(
  ({ code, language = "tsx", className }) => {
    const [snippet, setSnippet] = useState<JSX.Element | null>(null);

    const toHtml = useCallback(async () => {
      try {
        const out = (await highlighter()).codeToHtml(code, {
          lang: language,
          themes: {
            light: "github-light",
            dark: "one-dark-pro",
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
        console.error("⚠️ HTMLへの変換に失敗しました", e);

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
