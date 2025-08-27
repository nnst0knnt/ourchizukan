/**
 * Union型からプロパティのキーを抽出する
 */
type KeysOfUnion<T> = T extends unknown ? keyof T : never;

/**
 * オブジェクトが特定のプロパティを持っているかどうかをチェックする
 *
 * @example
 * type User = {
 *   name: string;
 *   profile?: {
 *     title: string;
 *     description?: string;
 *     thumbnail?: string;
 *   };
 * };
 *
 * const user: User = {
 *   name: "佐藤太郎",
 *   profile: {
 *     title: "ソフトウェアエンジニア",
 *   }
 * };
 *
 * const ok = has(user, "name");
 * const ok = has(user, "profile");
 * const ok = has(user.profile, "title");
 * const ng = has(user.profile, "description");
 */
export function has<T, K extends KeysOfUnion<NonNullable<T>>>(
  object: T,
  property: K,
): object is NonNullable<T> & {
  [P in K]-?: NonNullable<NonNullable<T>[P & keyof NonNullable<T>]>;
} {
  if (object === undefined || object === null) {
    return false;
  }

  const nonNullableObject = object as NonNullable<T>;

  return (
    Object.prototype.hasOwnProperty.call(
      nonNullableObject,
      property as string,
    ) &&
    nonNullableObject[property as keyof NonNullable<T>] !== undefined &&
    nonNullableObject[property as keyof NonNullable<T>] !== null
  );
}
