import { NetworkError, ServerError } from "@/errors";
import { AccessMethod, CookieOptions, toCookieOptions } from "@/models";
import { has } from "@/services/assertion/property";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { url, factory } from "../helpers";

/**
 * GuardOptions
 */
type GuardOptions = {
  /**
   * 保護が不要なルート
   */
  guests: string[];
  /**
   * 認証に失敗した場合の処理
   */
  failure:
    | {
        /** リダイレクト先 */
        redirect: string;
      }
    | {
        /** エラーメッセージ */
        message: string;
      };
};

/**
 * ルートを保護するミドルウェア
 */
export const guard = (
  options: GuardOptions = {
    guests: [],
    failure: {
      message: "おうちに入ることができませんでした",
    },
  },
) =>
  factory.createMiddleware(async (context, next) => {
    /**
     * 保護が不要な場合
     */
    if (options.guests.includes(context.req.path)) {
      await next();

      return;
    }

    try {
      const session = await context.var.keeper.session.get(
        getCookie(context, CookieOptions.Name) || "",
      );
      const expired = session && context.var.keeper.session.expired(session);

      /**
       * 有効期限内のセッションが存在する場合
       */
      if (session && !expired) {
        await context.var.keeper.session.update(session.id);

        await next();

        return;
      }

      /**
       * セッションが有効期限を過ぎている場合
       */
      if (session && expired) {
        await context.var.keeper.session.remove(session.id);

        deleteCookie(context, CookieOptions.Name);
      }

      /**
       * IPアドレスがホワイトリストに含まれている場合
       */
      const isWhitelisted = await context.var.keeper.whitelist.ip(
        context.var.ip,
      );
      if (isWhitelisted) {
        const session = await context.var.keeper.session.create(
          context.var.ip,
          AccessMethod.Ip,
        );

        if (!session) throw new ServerError();

        await next();

        setCookie(context, CookieOptions.Name, session.id, toCookieOptions());

        return;
      }

      /**
       * 認証に失敗した場合
       */
      return has(options.failure, "message")
        ? context.json(
            { message: options.failure.message },
            StatusCodes.UNAUTHORIZED,
          )
        : has(options.failure, "redirect")
          ? context.redirect(url(context, options.failure.redirect))
          : context.text(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    } catch (e) {
      console.error(e);

      throw new NetworkError();
    }
  });
