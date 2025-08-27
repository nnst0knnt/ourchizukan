import { ApplicationError } from "./application-error";

/**
 * NetworkError
 *
 * ネットワーク接続に失敗した場合に発生するエラーです。
 * 例えば、インターネット接続が切断されている場合などに使用されます。
 */
export class NetworkError extends ApplicationError {
  constructor() {
    super({
      code: "NETWORK_ERROR",
      title: "あら...",
      description: "インターネットの調子が悪いようです。",
    });

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
