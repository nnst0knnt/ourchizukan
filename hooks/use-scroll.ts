"use client";

import { useEffect, useRef } from "react";
import { useScrolling } from "react-use";

export const useScroll = (callback: () => void) => {
  const contentRef = useRef(document.getElementsByTagName("main")[0]);

  const isScrolling = useScrolling(contentRef);

  useEffect(() => {
    callback();

    if (isScrolling) {
      callback();
    }
  }, [isScrolling, callback]);
};
