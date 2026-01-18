"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
import { ComposeModal } from "@/components/compose-modal";
import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [composeOpen, setComposeOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <MobileHeader />

      <div className="mx-auto flex max-w-[1280px] justify-center">
        <div className="sticky top-0 hidden h-screen w-[68px] shrink-0 md:block xl:w-[275px]">
          <Sidebar onCompose={() => setComposeOpen(true)} />
        </div>

        <main className="min-h-screen w-full max-w-[600px] border-x border-zinc-200 dark:border-zinc-800">
          {children}
        </main>

        <RightSidebar />
      </div>

      <MobileNav />

      <Button
        onClick={() => setComposeOpen(true)}
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-sky-500 shadow-lg hover:bg-sky-600 md:hidden"
        size="icon"
      >
        <Feather className="h-6 w-6" />
      </Button>

      <ComposeModal open={composeOpen} onOpenChange={setComposeOpen} />
    </div>
  );
}
