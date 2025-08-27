/**
 * キーバリューストレージ
 */
export type KeyValueStorage = {
  /** 値を取得する */
  get: (key: string) => Promise<string | null>;
  /** 値をセットする */
  set: (key: string, value: string, expiry?: number) => Promise<void>;
  /** 値を削除する */
  delete: (key: string) => Promise<boolean>;
  /** 指定したプレフィックスのキーを全て取得する */
  list: (prefix: string) => Promise<string[]>;
};

/**
 * キーバリューストレージのファクトリ
 */
export type KeyValueStorageFactory<Store = any> = (
  store: Store,
) => KeyValueStorage;

/**
 * オブジェクトストレージ
 */
export type ObjectStorage = {
  /** オブジェクトを取得する */
  get: (key: string) => Promise<ArrayBuffer | null>;
  /** オブジェクトを保存する */
  put: (
    key: string,
    value: ArrayBuffer,
    options?: { mime?: string },
  ) => Promise<void>;
  /** オブジェクトを削除する */
  delete: (key: string) => Promise<boolean>;
  /** 署名付きURLを生成する */
  url: (key: string, expiry?: number) => Promise<string>;
};

/**
 * オブジェクトストレージのファクトリ
 */
export type ObjectStorageFactory<Bucket = any> = (
  bucket: Bucket,
) => ObjectStorage;
