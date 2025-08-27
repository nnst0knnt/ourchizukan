import { CloudOff } from "lucide-react";

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
      title: "あら、返事がありません",
      description: "インターネットの調子が悪いようです。",
      mark: CloudOff,
    });

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
