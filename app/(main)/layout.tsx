import { Sidebar } from "@/components/layout/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileComposeButton } from "@/components/mobile-compose-button";
import { ComposeProvider } from "@/components/compose-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposeProvider>
      <div className="relative min-h-screen">
        <MobileHeader />

        <div className="mx-auto flex max-w-[1280px] justify-center">
          <div className="sticky top-0 hidden h-screen w-[68px] shrink-0 md:block xl:w-[275px]">
            <Sidebar />
          </div>

          <main className="min-h-screen w-full max-w-[600px] border-x border-zinc-200 dark:border-zinc-800">
            {children}
          </main>

          <RightSidebar />
        </div>

        <MobileNav />
        <MobileComposeButton />
      </div>
    </ComposeProvider>
  );
}
