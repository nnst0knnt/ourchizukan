import { v4 as uuidv4 } from "uuid";

import { type AccessMethod, type Session, SessionOptions } from "@/models";

/**
 * 認証クライアント
 */
export const Gatekeeper = {
  /**
   * セッション管理
   */
  session: {
    /**
     * セッションを取得する
     */
    get: async (id: string): Promise<Session | null> => {
      try {
        // TODO: 実際のKVストアからセッションを取得する実装
        console.log(`セッション取得: ${id}`);
        return null;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    /**
     * 新しいセッションを作成する
     */
    create: async (
      ip: string,
      method: AccessMethod,
    ): Promise<Session | null> => {
      const now = Date.now();

      const session: Session = {
        id: uuidv4(),
        method,
        ip,
        createdAt: now,
        lastAccessedAt: now,
        expiredAt: now + SessionOptions.Lifetime,
      };

      try {
        // TODO: 実際のKVストアにセッションを保存する実装
        console.log("セッション作成:", session);

        return session;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    /**
     * セッションを更新する
     */
    update: async (id: string): Promise<Session | null> => {
      const session = await Gatekeeper.session.get(id);

      if (!session) {
        return null;
      }

      const updated: Session = {
        ...session,
        lastAccessedAt: Date.now(),
      };

      try {
        // TODO: 実際のKVストアにセッションを更新する実装
        console.log("セッション更新:", updated);
        return updated;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    /**
     * セッションを削除する
     */
    delete: async (id: string): Promise<boolean> => {
      try {
        // TODO: 実際のKVストアからセッションを削除する実装
        console.log(`セッション削除: ${id}`);
        return true;
      } catch (e) {
        console.error(e);

        return false;
      }
    },
  },
  /**
   * 許可リスト
   */
  whitelist: {
    /**
     * IPアドレスを検証する
     */
    ip: async (ip: string): Promise<boolean> => {
      try {
        // TODO: 実際のKVストアからIP許可リストを取得して検証する実装
        console.log(`IP検証: ${ip}`);
        return false;
      } catch (e) {
        console.error(e);

        return false;
      }
    },
    /**
     * メールアドレスを検証する
     */
    email: async (email: string): Promise<boolean> => {
      try {
        // TODO: 実際のKVストアからメール許可リストを取得して検証する実装
        console.log(`メール検証: ${email}`);
        return false;
      } catch (e) {
        console.error(e);

        return false;
      }
    },
  },
};
