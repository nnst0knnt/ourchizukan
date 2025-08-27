import families from "./families";
import { factory } from "./helpers";
import { guard } from "./middlewares";

/**
 * ルートのHonoインスタンス
 *
 * ここでは最上位のパスを定義し、個々のパスと対応する実装は各ディレクトリ内で定義します。
 * そして、各ディレクトリ内から公開された個別のHonoインスタンスをパスにマッピングすることで、クライアント側にもエンドポイントが公開されます。
 *
 * また、ミドルウェアの追加もメソッドチェーンで行います。
 */
export const app = factory
  .createApp()
  .use("*", guard)
  .basePath("/api")
  .route("/families", families);
