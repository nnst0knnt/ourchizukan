/**
 * 写真
 */
export type Photo = {
  /** 写真ID */
  id: string;
  /** アルバムID */
  albumId: string;
  /** オリジナル画像のキー */
  originalKey: string;
  /** サムネイル画像のキー */
  thumbnailKey: string;
  /** 撮影日時 */
  takenAt: number;
  /** 作成日時 */
  createdAt: number;
};
