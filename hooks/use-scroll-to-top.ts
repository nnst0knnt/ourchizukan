"use client";

import { createRef, useCallback, useEffect } from "react";

export const useScrollToTop = (defaultValue = true) => {
  const ref = createRef<HTMLElement>();

  const top = useCallback(
    () => (ref.current ? ref.current.scrollTo({ top: 0 }) : null),
    [ref],
  );

  useEffect(() => {
    if (!ref.current) {
      ref.current = document.querySelector("main");
    }

    if (defaultValue) {
      top();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    top,
  };
};
