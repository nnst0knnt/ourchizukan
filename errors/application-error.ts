import type { LucideIcon } from "lucide-react";

/**
 * ApplicationErrorProps
 */
type ApplicationErrorProps = {
  /** エラーのコード */
  code: string;
  /** エラーのタイトル */
  title: string;
  /** エラーの説明 */
  description: string;
  /** エラーを表す印 */
  mark: LucideIcon;
};

/**
 * ApplicationError
 *
 * アプリケーション全体で使用するエラーの基底クラスです。
 * 具体的なエラーはこのクラスを継承して作成します。
 */
export class ApplicationError extends Error {
  code: string;
  title: string;
  description: string;
  mark: LucideIcon;

  constructor({ code, title, description, mark }: ApplicationErrorProps) {
    super(title);

    this.code = code;
    this.title = title;
    this.description = description;
    this.mark = mark;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
