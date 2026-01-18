import { TweetCard } from "@/components/tweet-card";
import { tweets } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex">
          <button className="flex-1 py-4 font-bold transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            For you
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Following
          </button>
        </div>
      </header>

      <div>
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
