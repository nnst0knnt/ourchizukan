import { except } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { albums } from "./endpoints/albums";
import { families } from "./endpoints/families";
import { pictures } from "./endpoints/pictures";
import { factory } from "./helpers";
import { guard } from "./middlewares";

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
  .route("/albums", albums)
  .route("/pictures", pictures)
  .notFound((context) =>
    context.json({ message: ReasonPhrases.NOT_FOUND }, StatusCodes.NOT_FOUND),
  )
  .onError((e, context) => {
    console.error(`🚨 予期せぬエラーが発生しました\n`, e);

    return context.json(
      { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  });
