"use client";

import { useEffect } from "react";

import { Button, Description, Title } from "@/components/elements";
import { ApplicationError, UnknownError } from "@/errors";

/**
 * ErrorProps
 */
type ErrorProps = {
  error: Error;
  reset: () => void;
};

/**
 * Error
 *
 * エラーが発生した場合に表示されるコンポーネントです。
 * エラーの内容に応じて、適切なメッセージとアクションを表示します。
 */
export default function Error({ error: e, reset }: ErrorProps) {
  const error = e instanceof ApplicationError ? e : new UnknownError();

  const Mark = error.mark;

  useEffect(() => console.error(e), [e]);

  return (
    <div className="flex flex-col gap-4">
      <Title as="h1" mark={<Mark size={48} />}>
        {error.message}
      </Title>

      <Description>
        <p>{error.description}</p>
      </Description>

      <div className="mt-4">
        <Button onClick={reset} size="large">
          もう一度試す
        </Button>
      </div>
    </div>
  );
}
