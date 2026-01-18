import { Search } from "lucide-react";
import { trending, tweets } from "@/lib/mock-data";
import { TweetCard } from "@/components/tweet-card";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 p-3 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-zinc-100 py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:bg-transparent focus:ring-2 focus:ring-sky-500 dark:bg-zinc-800 dark:focus:bg-transparent"
          />
        </div>
      </header>

      <div>
        <h2 className="px-4 py-3 text-xl font-bold">Trends for you</h2>
        <div className="flex flex-col">
          {trending.map((topic) => (
            <Link
              key={topic.id}
              href={`/explore?q=${encodeURIComponent(topic.name)}`}
              className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <span className="text-xs text-zinc-500">{topic.category}</span>
              <span className="font-bold">{topic.name}</span>
              <span className="text-xs text-zinc-500">{topic.postCount}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="px-4 py-3 text-xl font-bold">Posts</h2>
        {tweets.slice(0, 5).map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
