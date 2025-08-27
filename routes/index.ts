import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { families } from "./endpoints/families";
import { factory } from "./helpers";
import { environment, guard } from "./middlewares";

/**
 * ルートのHonoインスタンス
 *
 * ここでは最上位のパスを定義し、個々のパスと対応する実装は`endpoints`内の各ディレクトリで定義します。
 * そして、各ディレクトリから公開された個別のHonoインスタンスをパスにマッピングすることで、クライアント側にもエンドポイントが公開されます。
 */
export const app = factory
  .createApp()
  .basePath("/api")
  .use(secureHeaders())
  .use(logger())
  .use(environment())
  .use(guard())
  .route("/families", families);
