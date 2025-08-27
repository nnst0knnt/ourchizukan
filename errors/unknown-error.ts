import { ApplicationError } from "./application-error";

/**
 * UnknownError
 *
 * 予期せぬ動作をした場合に発生するエラーです。
 * 例えば、アプリケーションの状態が不正な場合などに使用されます。
 */
export class UnknownError extends ApplicationError {
  constructor() {
    super({
      code: "UNKNOWN_ERROR",
      title: "おっと...",
      description: "何かが思い通りに動いていないようです。",
    });

    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
