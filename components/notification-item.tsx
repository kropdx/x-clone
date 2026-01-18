import Link from "next/link";
import { Heart, Repeat2, UserPlus, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
}

const iconMap = {
  like: { icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
  retweet: { icon: Repeat2, color: "text-green-500", bg: "bg-green-500/10" },
  follow: { icon: UserPlus, color: "text-sky-500", bg: "bg-sky-500/10" },
  reply: { icon: MessageCircle, color: "text-sky-500", bg: "bg-sky-500/10" },
};

const textMap = {
  like: "liked your post",
  retweet: "reposted your post",
  follow: "followed you",
  reply: "replied to your post",
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const { icon: Icon, color, bg } = iconMap[notification.type];

  return (
    <Link
      href={
        notification.tweet
          ? `/status/${notification.tweet.id}`
          : `/${notification.actor.username}`
      }
    >
      <article className="flex gap-3 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", bg)}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={notification.actor.avatarUrl}
                alt={notification.actor.name}
              />
              <AvatarFallback>{notification.actor.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <p className="mt-1">
            <span className="font-bold">{notification.actor.name}</span>{" "}
            <span className="text-zinc-500">{textMap[notification.type]}</span>
          </p>

          {notification.tweet && (
            <p className="mt-1 text-zinc-500 line-clamp-2">
              {notification.tweet.content}
            </p>
          )}

          <span className="mt-1 text-sm text-zinc-500">{notification.createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
