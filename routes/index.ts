import { except } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { families } from "./endpoints/families";
import { factory } from "./helpers";
import { guard } from "./middlewares";

/**
 * ルートのHonoインスタンス
 *
 * ここでは最上位のパスを定義し、個々のパスと対応する実装は`endpoints`内の各ディレクトリで定義します。
 * そして、各ディレクトリから公開された個別のHonoインスタンスをパスにマッピングすることで、クライアント側にもエンドポイントが公開されます。
 */
export const app = factory
  .createApp()
  .basePath("/api")
  .use(
    except(
      ["/api/families/member"],
      guard({
        guests: ["/api/families/enter"],
        failure: {
          unauthenticated: {
            message: "おうちに入ることができませんでした",
          },
          authenticated: {
            message: "既におうちに入っています",
          },
        },
      }),
    ),
  )
  .route("/families", families)
  .notFound((context) =>
    context.json(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND),
  )
  .onError((e, context) => {
    console.error(`🚨 予期せぬエラーが発生しました\n`, e);

    return context.json(
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  });
