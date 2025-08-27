"use client";

import { createRef, useCallback, useEffect } from "react";

export const useLockScroll = () => {
  const ref = createRef<HTMLElement>();
  const overflow = ref.current ? ref.current.style.overflow : null;

  const lock = useCallback(() => {
    if (!ref.current) return;

    ref.current.style.overflow = "hidden";
  }, [ref]);

  const unlock = useCallback(() => {
    if (!ref.current) return;

    ref.current.style.overflow = overflow ?? "auto";
  }, [ref, overflow]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = document.querySelector("main");
    }

    lock();

    return () => unlock();
  }, [ref, lock, unlock]);

  return {};
};
