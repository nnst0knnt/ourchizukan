/**
 * 写真
 */
export type Picture = {
  /** 写真ID */
  id: string;
  /** アルバムID */
  albumId: string;
  /** オリジナル写真のキー */
  originalKey: string;
  /** サムネイル写真のキー */
  thumbnailKey: string;
  /** 撮影日時 */
  takenAt: number;
  /** 作成日時 */
  createdAt: number;
};
