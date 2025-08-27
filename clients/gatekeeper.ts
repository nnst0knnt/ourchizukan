import { v4 as uuid } from "uuid";

import {
  type AccessMethod,
  type Attempt,
  type AttemptKind,
  RateLimitOptions,
  type Session,
  SessionOptions,
} from "@/models";

import { date } from "./date";
import { storage } from "./key-value-storage";

export const gatekeeper = {
  session: {
    prefix: "sessions",
    generateKey: (id: string) => `${gatekeeper.session.prefix}:${id}`,
    get: async (id: string): Promise<Session | null> => {
      try {
        const data = await storage.get(gatekeeper.session.generateKey(id));

        return data ? (JSON.parse(data) as Session) : null;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    create: async (
      ip: string,
      method: AccessMethod,
    ): Promise<Session | null> => {
      const now = date().unix();

      const session: Session = {
        id: uuid(),
        method,
        ip,
        createdAt: now,
        lastAccessedAt: now,
        expiredAt: now + SessionOptions.Lifetime,
      };

      try {
        await storage.set(
          gatekeeper.session.generateKey(session.id),
          JSON.stringify(session),
          SessionOptions.Lifetime,
        );

        return session;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    update: async (id: string): Promise<Session | null> => {
      const session = await gatekeeper.session.get(id);

      if (!session) {
        return null;
      }

      const updated: Session = {
        ...session,
        lastAccessedAt: date().unix(),
      };

      try {
        await storage.set(
          gatekeeper.session.generateKey(id),
          JSON.stringify(updated),
          SessionOptions.Lifetime,
        );

        return updated;
      } catch (e) {
        console.error(e);

        return null;
      }
    },
    delete: async (id: string): Promise<boolean> => {
      try {
        return await storage.delete(gatekeeper.session.generateKey(id));
      } catch (e) {
        console.error(e);

        return false;
      }
    },
  },
  whitelist: {
    prefix: "whitelist",
    generateKey: (kind: "ips" | "emails") =>
      `${gatekeeper.whitelist.prefix}:${kind}`,
    ip: async (ip: string): Promise<boolean> => {
      try {
        const data = await storage.get(gatekeeper.whitelist.generateKey("ips"));

        if (!data) {
          return false;
        }

        return (JSON.parse(data) as string[]).includes(ip);
      } catch (e) {
        console.error(e);

        return false;
      }
    },
    email: async (email: string): Promise<boolean> => {
      try {
        const data = await storage.get(
          gatekeeper.whitelist.generateKey("emails"),
        );

        if (!data) {
          return false;
        }

        return (JSON.parse(data) as string[]).includes(email);
      } catch (e) {
        console.error(e);

        return false;
      }
    },
  },
  attempts: {
    prefix: "attempts",
    generateKey: (ip: string) => `${gatekeeper.attempts.prefix}:${ip}`,
    add: async (ip: string, kind: AttemptKind): Promise<void> => {
      try {
        const key = gatekeeper.attempts.generateKey(ip);
        const now = date().unix();
        const data = await storage.get(key);

        let attempts: Attempt[] = data ? JSON.parse(data) : [];

        attempts = attempts.filter(
          ({ at }) => now - at < RateLimitOptions.CountingPeriod,
        );

        attempts.push({ ip, kind, at: now });

        await storage.set(
          key,
          JSON.stringify(attempts),
          RateLimitOptions.LockoutDuration,
        );
      } catch (e) {
        console.error(e);
      }
    },
    verify: async (ip: string): Promise<boolean> => {
      try {
        const key = gatekeeper.attempts.generateKey(ip);
        const data = await storage.get(key);

        if (!data) return true;

        const attempts = (JSON.parse(data) as Attempt[]).filter(
          ({ at }) => date().unix() - at < RateLimitOptions.CountingPeriod,
        );

        return attempts.length < RateLimitOptions.MaxAttempts;
      } catch (e) {
        console.error(e);

        return true;
      }
    },
  },
};
