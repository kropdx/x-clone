"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Search, Bell, Mail, Bookmark, User, Settings } from "lucide-react";

const menuItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/messages", icon: Mail, label: "Messages" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: `/${currentUser.username}`, icon: User, label: "Profile" },
];

interface MobileHeaderProps {
  title?: string;
}

export function MobileHeader({ title = "Home" }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col">
            <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <ModeToggle />
              </div>
              <div className="mt-3">
                <p className="font-bold">{currentUser.name}</p>
                <p className="text-sm text-zinc-500">@{currentUser.username}</p>
              </div>
              <div className="mt-3 flex gap-4 text-sm">
                <span>
                  <strong>{currentUser.followingCount}</strong>{" "}
                  <span className="text-zinc-500">Following</span>
                </span>
                <span>
                  <strong>{currentUser.followersCount.toLocaleString()}</strong>{" "}
                  <span className="text-zinc-500">Followers</span>
                </span>
              </div>
            </div>
            <nav className="flex flex-col py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-6 py-3 text-xl font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-zinc-200 dark:border-zinc-800" />
              <Link
                href="#"
                className="flex items-center gap-4 px-6 py-3 text-xl font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Settings className="h-6 w-6" />
                Settings
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/home">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>

      <ModeToggle />
    </header>
  );
}
