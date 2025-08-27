import { AccessMethod } from "@/models";
import { has } from "@/services/assertion/property";
import type { Context, Next } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { url, factory } from "../helpers";

/**
 * FailureOptions
 */
type FailureOptions =
  | {
      /** リダイレクト先 */
      redirect: string;
    }
  | {
      /** エラーメッセージ */
      message: string;
    };

/**
 * GuardOptions
 */
type GuardOptions = {
  /**
   * 未認証用のルート
   */
  guests?: string[];
  /**
   * 失敗時のアクション
   */
  failure: {
    /** 未認証時に認証用のルートにアクセスした場合 */
    unauthenticated: FailureOptions;
    /** 認証時に未認証用のルートにアクセスした場合 */
    authenticated: FailureOptions;
  };
};

/**
 * ルートを保護するミドルウェア
 */
export const guard = (_options: GuardOptions) =>
  factory.createMiddleware(async (context, next) => {
    const options = {
      guests: [],
      ..._options,
    } as Required<GuardOptions>;
    let session = await context.var.keeper.session.get(context.var.ip);

    /**
     * セッションの有効期限が過ぎている場合
     */
    if (session && context.var.keeper.session.expired(session)) {
      await context.var.keeper.session.remove(context.var.ip);

      session = null;
    }

    /**
     * 有効期限内のセッションが存在する場合
     */
    if (session) {
      return authenticated(context, options, next);
    }

    /**
     * IPアドレスがホワイトリストに含まれている場合
     */
    const isWhitelisted = await context.var.keeper.whitelist.ip(context.var.ip);
    if (isWhitelisted) {
      await context.var.keeper.session.create(context.var.ip, AccessMethod.Ip);

      return authenticated(context, options, next);
    }

    /**
     * 未認証用のルートにアクセスした場合
     */
    if (!session && options.guests.includes(context.req.path)) {
      await next();

      return;
    }

    /**
     * 認証に失敗した場合
     */
    return unauthenticated(context, options, next);
  });

/**
 * 未認証時のアクション
 */
const unauthenticated = async (
  context: Context,
  options: Required<GuardOptions>,
  next: Next,
) => {
  if (options.guests.includes(context.req.path)) {
    await next();

    return;
  }

  if (has(options.failure.unauthenticated, "message")) {
    return context.json(
      options.failure.unauthenticated.message,
      StatusCodes.UNAUTHORIZED,
    );
  }

  if (has(options.failure.unauthenticated, "redirect")) {
    return context.redirect(
      url(context, options.failure.unauthenticated.redirect),
    );
  }

  return context.text(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
};

/**
 * 認証時のアクション
 */
const authenticated = async (
  context: Context,
  options: Required<GuardOptions>,
  next: Next,
) => {
  if (!options.guests.includes(context.req.path)) {
    await next();

    return;
  }

  if (has(options.failure.authenticated, "message")) {
    return context.json(
      options.failure.authenticated.message,
      StatusCodes.FORBIDDEN,
    );
  }

  if (has(options.failure.authenticated, "redirect")) {
    return context.redirect(
      url(context, options.failure.authenticated.redirect),
    );
  }

  return context.text(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
};
