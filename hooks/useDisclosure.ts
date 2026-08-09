"use client";

import { useState } from "react";

export function useDisclosure(initialOpen = false): {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
} {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return {
    isOpen,
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
    toggle: () => {
      setIsOpen((current) => !current);
    },
  };
}
