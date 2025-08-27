import { forwardRef, useState } from "react";
import { Button, type ButtonProps, ButtonStatus } from "./button";

/**
 * 非同期ボタンコンポーネントのプロパティ
 */
export type AsyncButtonProps = Omit<ButtonProps, "status" | "onClick"> & {
  /** クリック時の非同期処理 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  /** 成功時の処理 */
  onSuccess?: () => void;
  /** エラー時の処理 */
  onError?: (error: unknown) => void;
  /** 成功・エラー時に自動でリセットするかどうか */
  autoReset?: boolean;
  /** ステータスを自動リセットするまでの時間（ミリ秒） */
  resetDelay?: number;
};

/**
 * 非同期ボタンコンポーネント
 *
 * 内部で状態管理を行い、非同期処理の状態に応じてボタンの表示を切り替えます。
 * 高齢者にも使いやすいよう、処理中や結果を視覚的に分かりやすく表示します。
 */
export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  (
    {
      onClick,
      onSuccess,
      onError,
      autoReset = true,
      resetDelay = 3000,
      children,
      ...props
    },
    ref,
  ) => {
    let timeout: NodeJS.Timeout | null = null;
    const [status, setStatus] = useState<ButtonStatus>(ButtonStatus.Idle);

    const click = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (status === ButtonStatus.Loading) return;

      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        setStatus(ButtonStatus.Loading);
        await onClick?.(event);
        setStatus(ButtonStatus.Success);
        onSuccess?.();
      } catch (e) {
        setStatus(ButtonStatus.Error);
        onError?.(e);
      }

      if (autoReset) {
        timeout = setTimeout(() => {
          setStatus(ButtonStatus.Idle);
          timeout = null;
        }, resetDelay);
      }
    };

    return (
      <Button ref={ref} {...props} status={status} onClick={click}>
        {children}
      </Button>
    );
  },
);

AsyncButton.displayName = "AsyncButton";
