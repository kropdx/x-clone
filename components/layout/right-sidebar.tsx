import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trending, users } from "@/lib/mock-data";
import Link from "next/link";

export function RightSidebar() {
  const suggestedUsers = users.slice(0, 3);

  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] flex-col gap-4 overflow-y-auto py-2 pr-4 xl:flex">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full bg-zinc-100 py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:bg-transparent focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:focus:bg-transparent"
        />
      </div>

      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
        <h2 className="p-4 text-xl font-bold">Trends for you</h2>
        <div className="flex flex-col">
          {trending.map((topic) => (
            <Link
              key={topic.id}
              href={`/explore?q=${encodeURIComponent(topic.name)}`}
              className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <span className="text-xs text-zinc-500">{topic.category}</span>
              <span className="font-bold">{topic.name}</span>
              <span className="text-xs text-zinc-500">{topic.postCount}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/explore"
          className="block rounded-b-2xl px-4 py-4 text-sky-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
        >
          Show more
        </Link>
      </div>

      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
        <h2 className="p-4 text-xl font-bold">Who to follow</h2>
        <div className="flex flex-col">
          {suggestedUsers.map((user) => (
            <Link
              key={user.id}
              href={`/${user.username}`}
              className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 font-bold">
                    {user.name}
                    {user.verified && (
                      <svg
                        viewBox="0 0 22 22"
                        className="h-4 w-4 fill-sky-500"
                      >
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-zinc-500">@{user.username}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-full font-bold"
                size="sm"
              >
                Follow
              </Button>
            </Link>
          ))}
        </div>
        <Link
          href="/explore"
          className="block rounded-b-2xl px-4 py-4 text-sky-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
        >
          Show more
        </Link>
      </div>

      <footer className="flex flex-wrap gap-x-3 gap-y-1 px-4 text-xs text-zinc-500">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <span>© 2026 X Corp.</span>
      </footer>
    </aside>
  );
}
