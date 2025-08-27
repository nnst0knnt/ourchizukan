import { NetworkError, ServerError } from "@/errors";
import { AccessMethod, CookieOptions, toCookieOptions } from "@/models";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { url, factory } from "../helpers";

/**
 * 保護が不要なルート
 */
const GuestRoutes = {
  Enter: "/house-entries/enter",
} as const;

/**
 * 保護が不要なルートかどうかを判定する
 */
const isGuest = (pathname: string): boolean =>
  Object.values(GuestRoutes as Record<string, string>).includes(pathname);

/**
 * ルートを保護するミドルウェア
 */
export const guard = () =>
  factory.createMiddleware(async (context, next) => {
    /**
     * 保護が不要な場合
     */
    if (isGuest(context.req.path)) {
      await next();

      return;
    }

    try {
      const session = await context.var.gatekeeper.session.get(
        getCookie(context, CookieOptions.Name) || "",
      );
      const expired =
        session && context.var.gatekeeper.session.expired(session);

      /**
       * 有効期限内のセッションが存在する場合
       */
      if (session && !expired) {
        await context.var.gatekeeper.session.update(session.id);

        await next();

        return;
      }

      /**
       * セッションが有効期限を過ぎている場合
       */
      if (session && expired) {
        await context.var.gatekeeper.session.remove(session.id);

        deleteCookie(context, CookieOptions.Name);
      }

      /**
       * IPアドレスがホワイトリストに含まれている場合
       */
      const isWhitelisted = await context.var.gatekeeper.whitelist.ip(
        context.var.ip,
      );
      if (isWhitelisted) {
        const session = await context.var.gatekeeper.session.create(
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
      return context.redirect(url(context, GuestRoutes.Enter));
    } catch (e) {
      console.error(e);

      throw new NetworkError();
    }
  });
