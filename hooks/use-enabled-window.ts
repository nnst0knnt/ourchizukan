"use client";

import { useEffect, useState } from "react";

export const useEnabledWindow = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(typeof window !== "undefined");
  }, []);

  return enabled;
};
