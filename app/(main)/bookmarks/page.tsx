"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { TweetCard } from "@/components/tweet-card";
import { tweets } from "@/lib/mock-data";
import { Tweet } from "@/lib/types";

export default function BookmarksPage() {
  const [bookmarkedTweets, setBookmarkedTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    setBookmarkedTweets(tweets.filter((tweet) => tweet.isBookmarked));
  }, []);

  const handleBookmarkChange = (tweetId: string, isBookmarked: boolean) => {
    if (isBookmarked) {
      const tweet = tweets.find((t) => t.id === tweetId);
      if (tweet) {
        setBookmarkedTweets((prev) => [...prev, tweet]);
      }
    } else {
      setBookmarkedTweets((prev) => prev.filter((t) => t.id !== tweetId));
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 px-4 py-4 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <h1 className="text-xl font-bold">Bookmarks</h1>
        <p className="text-sm text-zinc-500">@yourhandle</p>
      </header>

      {bookmarkedTweets.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Bookmark className="h-8 w-8 text-zinc-500" />
          </div>
          <h2 className="text-3xl font-bold">Save posts for later</h2>
          <p className="mt-2 max-w-sm text-zinc-500">
            Bookmark posts to easily find them again in the future.
          </p>
        </div>
      ) : (
        <div>
          {bookmarkedTweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onBookmarkChange={(isBookmarked) =>
                handleBookmarkChange(tweet.id, isBookmarked)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
