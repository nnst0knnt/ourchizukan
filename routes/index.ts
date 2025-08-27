import families from "./endpoints/families";
import { factory } from "./helpers";

/**
 * ルートのHonoインスタンス
 *
 * ここでは最上位のパスを定義し、個々のパスと対応する実装は`endpoints`内の各ディレクトリで定義します。
 * そして、各ディレクトリから公開された個別のHonoインスタンスをパスにマッピングすることで、クライアント側にもエンドポイントが公開されます。
 */
export const app = factory
  .createApp()
  .basePath("/api")
  .route("/families", families);
