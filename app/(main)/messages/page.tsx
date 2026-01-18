import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 px-4 py-4 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <h1 className="text-xl font-bold">Messages</h1>
      </header>

      <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600">
          <Mail className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold">Coming Soon</h2>
        <p className="mt-3 max-w-md text-lg text-zinc-500">
          Direct messages are coming in a future update. Stay tuned!
        </p>
        <Button
          className="mt-6 gap-2 rounded-full bg-sky-500 px-6 py-3 font-bold hover:bg-sky-600"
          disabled
        >
          Get notified
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
