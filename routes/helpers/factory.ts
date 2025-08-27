import { createFactory } from "hono/factory";

import type { Environment } from "../middlewares";

/**
 * Honoのファクトリ
 *
 * エンドポイントごとにファクトリを利用してハンドラを定義します。
 */
export const factory = createFactory<{
  Variables: Environment["Variables"];
}>();
