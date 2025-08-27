"use client";

import { Description, Title } from "@/components/elements";
import {
  type ApplicationError,
  NetworkError,
  ServerError,
  UnknownError,
} from "@/errors";

/**
 * 補足するエラーの一覧
 */
const Errors = {
  NetworkError,
  ServerError,
  UnknownError,
} as Record<string, new () => ApplicationError>;

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
 * エラーが発生した場合に表示されるページです。
 * エラーの内容に応じて、適切なメッセージとアクションを表示します。
 */
export default function Error({ error: e }: ErrorProps) {
  const error = new (Errors[e.name] ?? UnknownError)();

  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">{error.title}</Title>

      <Description>
        <p>{error.description}</p>
      </Description>
    </div>
  );
}
