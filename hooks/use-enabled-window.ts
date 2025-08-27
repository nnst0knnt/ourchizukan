"use client";

import { useEffect, useState } from "react";

export const useEnabledWindow = () => {
  const [enabled, setEnabled] = useState(false);

  /**
   * windowオブジェクトにアクセス可能か確認する
   */
  useEffect(() => {
    setEnabled(typeof window !== "undefined");
  }, []);

  return enabled;
};
