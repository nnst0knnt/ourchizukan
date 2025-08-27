"use client";

import { cn } from "@/styles/functions";

/**
 * タブ
 */
type Tab = {
  /** ID */
  id: string;
  /** 表示名 */
  label: string;
  /** 実際のディレクトリ名 */
  directory: string;
};

/**
 * TabProps
 */
type TabProps = {
  /** タブの一覧 */
  tabs: Tab[];
  /** 現在のアクティブなタブ */
  active: string;
  /** タブを切り替えたときのハンドラー */
  onChange: (tab: Tab) => void;
};

/**
 * Tab
 *
 * UIギャラリーのナビゲーションタブを提供します。
 * レスポンシブ対応のタブUIで、モバイルでは横スクロール可能です。
 * スクロールバーは非表示になっています。
 */
export const Tab = ({ tabs, active, onChange }: TabProps) => {
  return (
    <div className="no-scrollbar w-full overflow-x-auto">
      <div className="flex min-w-max border-outline border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "px-4 py-2 font-medium transition-colors duration-200",
              "min-w-28 whitespace-nowrap text-center md:min-w-32",
              active === tab.id
                ? "border-brand border-b-4 text-primary"
                : "text-secondary hover:text-primary",
            )}
            onClick={() => onChange(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
