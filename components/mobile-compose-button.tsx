"use client";

import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompose } from "@/components/compose-provider";

export function MobileComposeButton() {
  const { openCompose } = useCompose();

  return (
    <Button
      onClick={openCompose}
      className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-sky-500 shadow-lg hover:bg-sky-600 md:hidden"
      size="icon"
    >
      <Feather className="h-6 w-6" />
    </Button>
  );
}
