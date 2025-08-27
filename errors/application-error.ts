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
};

/**
 * ApplicationError
 *
 * アプリケーション全体で使用するエラーの基底クラスです。
 * 具体的なエラーはこのクラスを継承して作成します。
 */
export class ApplicationError extends Error {
  name: string;
  code: string;
  title: string;
  description: string;

  constructor({ code, title, description }: ApplicationErrorProps) {
    super(title);

    this.name = this.constructor.name;
    this.code = code;
    this.title = title;
    this.description = description;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
