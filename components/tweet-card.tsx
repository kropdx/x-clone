"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Tweet } from "@/lib/types";
import { formatCount } from "@/lib/mock-data";

interface TweetCardProps {
  tweet: Tweet;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

export function TweetCard({ tweet, onBookmarkChange }: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRetweeted(!isRetweeted);
    setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmarkChange?.(newState);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/status/${tweet.id}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <Link href={`/status/${tweet.id}`}>
      <article
        className={cn(
          "group relative px-4 py-3",
          "bg-white dark:bg-zinc-900",
          "border-b border-zinc-100 dark:border-zinc-800/50",
          "transition-all duration-200 ease-out",
          "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30",
          "cursor-pointer"
        )}
      >
        <div className="flex gap-3">
          <Link
            href={`/${tweet.author.username}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0"
          >
            <Avatar
              className={cn(
                "h-12 w-12",
                "ring-2 ring-transparent",
                "transition-all duration-300 ease-out",
                "group-hover:ring-sky-500/20",
                "shadow-sm shadow-black/5"
              )}
            >
              <AvatarImage src={tweet.author.avatarUrl} alt={tweet.author.name} />
              <AvatarFallback>{tweet.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1">
                <Link
                  href={`/${tweet.author.username}`}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate font-bold hover:underline"
                >
                  {tweet.author.name}
                </Link>
                {tweet.author.verified && (
                  <svg viewBox="0 0 22 22" className="h-5 w-5 shrink-0 fill-sky-500">
                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                  </svg>
                )}
                <Link
                  href={`/${tweet.author.username}`}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate text-zinc-500"
                >
                  @{tweet.author.username}
                </Link>
                <span className="text-zinc-500">·</span>
                <span className="shrink-0 text-zinc-500">{tweet.createdAt}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-sky-500/10 hover:text-sky-500"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Not interested</DropdownMenuItem>
                  <DropdownMenuItem>Follow @{tweet.author.username}</DropdownMenuItem>
                  <DropdownMenuItem>Mute @{tweet.author.username}</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    Block @{tweet.author.username}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <TweetContent content={tweet.content} />

            {tweet.imageUrl && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <Image
                  src={tweet.imageUrl}
                  alt="Tweet image"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <div className="-ml-2 mt-3 flex items-center justify-between">
              <button
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "group/btn flex items-center gap-1 rounded-full px-2 py-1.5",
                  "text-zinc-500 transition-all duration-200 ease-out",
                  "hover:bg-sky-500/10 hover:text-sky-500"
                )}
              >
                <MessageCircle className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                <span className="text-sm tabular-nums">{formatCount(tweet.replyCount)}</span>
              </button>

              <button
                onClick={handleRetweet}
                className={cn(
                  "group/btn flex items-center gap-1 rounded-full px-2 py-1.5",
                  "transition-all duration-150 ease-out",
                  isRetweeted
                    ? "text-green-500"
                    : "text-zinc-500 hover:bg-green-500/10 hover:text-green-500"
                )}
              >
                <Repeat2 className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                <span className="text-sm tabular-nums">{formatCount(retweetCount)}</span>
              </button>

              <button
                onClick={handleLike}
                className={cn(
                  "group/btn flex items-center gap-1 rounded-full px-2 py-1.5",
                  "transition-all duration-200 ease-out",
                  isLiked
                    ? "text-rose-500"
                    : "text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500"
                )}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-transform group-hover/btn:scale-110",
                    isLiked && "fill-current animate-[heart-pop_0.3s_ease-out]"
                  )}
                />
                <span className="text-sm tabular-nums">{formatCount(likeCount)}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={cn(
                  "group/btn flex items-center gap-1 rounded-full px-2 py-1.5",
                  "transition-all duration-200 ease-out",
                  isBookmarked
                    ? "text-sky-500"
                    : "text-zinc-500 hover:bg-sky-500/10 hover:text-sky-500"
                )}
              >
                <Bookmark
                  className={cn(
                    "h-5 w-5 transition-transform group-hover/btn:scale-110",
                    isBookmarked && "fill-current"
                  )}
                />
              </button>

              <button
                onClick={handleShare}
                className={cn(
                  "group/btn flex items-center gap-1 rounded-full px-2 py-1.5",
                  "text-zinc-500 transition-all duration-200 ease-out",
                  "hover:bg-sky-500/10 hover:text-sky-500"
                )}
              >
                <Share className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function TweetContent({ content }: { content: string }) {
  const parts = content.split(/(@\w+|#\w+)/g);

  return (
    <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("@")) {
          return (
            <Link
              key={i}
              href={`/${part.slice(1)}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sky-500 hover:underline"
            >
              {part}
            </Link>
          );
        }
        if (part.startsWith("#")) {
          return (
            <Link
              key={i}
              href={`/explore?q=${encodeURIComponent(part)}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sky-500 hover:underline"
            >
              {part}
            </Link>
          );
        }
        return part;
      })}
    </p>
  );
}
