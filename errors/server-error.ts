import { ServerCrash } from "lucide-react";

import { ApplicationError } from "./application-error";

/**
 * ServerError
 *
 * サーバーで異常があった場合に発生するエラーです。
 * 例えば、データベースの接続に失敗した場合などに使用されます。
 */
export class ServerError extends ApplicationError {
  constructor() {
    super({
      code: "SERVER_ERROR",
      title: "ありゃ、うまく進んでいません",
      description: "今はうまく応えてくれないようです。",
      mark: ServerCrash,
    });

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
