"use client";

import { Description, Title } from "@/components/elements/typography";
import {
  type ApplicationError,
  NetworkError,
  ServerError,
  UnknownError,
} from "@/errors";

const Constructors = {
  NetworkError,
  ServerError,
  UnknownError,
} as Record<string, new () => ApplicationError>;

type ErrorProps = {
  error: Error;
  reset: () => void;
};

/**
 * エラー境界
 *
 * エラーが発生した場合に表示されるページです。
 */
export default function Error({ error: e }: ErrorProps) {
  const error = new (Constructors[e.name] ?? UnknownError)();

  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">{error.title}</Title>

      <Description>
        <p>{error.description}</p>
      </Description>
    </div>
  );
}
