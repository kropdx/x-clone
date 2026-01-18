import { NotificationItem } from "@/components/notification-item";
import { notifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <h1 className="px-4 py-4 text-xl font-bold">Notifications</h1>
        <div className="flex border-t border-zinc-200 dark:border-zinc-800">
          <button className="flex-1 border-b-2 border-sky-500 py-4 font-bold">
            All
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Verified
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Mentions
          </button>
        </div>
      </header>

      <div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
