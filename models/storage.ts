/**
 * キーバリューストレージ
 */
export type KeyValueStorage = {
  /** キーを指定して値を取得する */
  get: (key: string) => Promise<string | null>;
  /** 指定したキーに値をセットする */
  set: (key: string, value: string, expirySeconds?: number) => Promise<void>;
  /** 指定したキーを削除する */
  delete: (key: string) => Promise<boolean>;
  /** 指定したプレフィックスのキーを全て取得する */
  list: (prefix: string) => Promise<string[]>;
};

/**
 * キーバリューストレージのファクトリ
 */
export type CreateKeyValueStorage = (namespace: KVNamespace) => KeyValueStorage;
