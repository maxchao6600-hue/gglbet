"use client";

import { useEffect } from "react";

const BODY_SCROLL_LOCK_CLASS = "is-scroll-locked";

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    document.body.classList.add(BODY_SCROLL_LOCK_CLASS);

    return () => {
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    };
  }, [locked]);
}
