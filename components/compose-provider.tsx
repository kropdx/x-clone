"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ComposeModal } from "@/components/compose-modal";

interface ComposeContextValue {
  openCompose: () => void;
}

const ComposeContext = createContext<ComposeContextValue | null>(null);

export function useCompose() {
  const context = useContext(ComposeContext);
  if (!context) {
    throw new Error("useCompose must be used within a ComposeProvider");
  }
  return context;
}

export function ComposeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCompose = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <ComposeContext.Provider value={{ openCompose }}>
      {children}
      <ComposeModal open={isOpen} onOpenChange={setIsOpen} />
    </ComposeContext.Provider>
  );
}
