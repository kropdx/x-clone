"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  Feather,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/messages", icon: Mail, label: "Messages" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: `/${currentUser.username}`, icon: User, label: "Profile" },
];

interface SidebarProps {
  onCompose: () => void;
}

export function Sidebar({ onCompose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen flex-col justify-between py-2 px-2 xl:px-4">
      <div className="flex flex-col gap-1">
        <Link
          href="/home"
          className="flex h-14 w-14 items-center justify-center rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-full px-4 py-3 text-xl transition-all duration-200",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  isActive && "font-bold"
                )}
              >
                <item.icon className="h-7 w-7" strokeWidth={isActive ? 2.5 : 2} />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
          <button
            className={cn(
              "flex items-center gap-4 rounded-full px-4 py-3 text-xl transition-all duration-200",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            )}
          >
            <MoreHorizontal className="h-7 w-7" />
            <span className="hidden xl:inline">More</span>
          </button>
        </nav>

        <Button
          onClick={onCompose}
          className="mt-4 h-14 rounded-full bg-sky-500 text-lg font-bold hover:bg-sky-600"
        >
          <Feather className="h-6 w-6 xl:hidden" />
          <span className="hidden xl:inline">Post</span>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-full p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col xl:flex">
            <span className="text-sm font-bold">{currentUser.name}</span>
            <span className="text-sm text-zinc-500">@{currentUser.username}</span>
          </div>
        </div>
        <ModeToggle />
      </div>
    </aside>
  );
}
