"use client";

import { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, MessageCircle, Repeat2, Heart, Bookmark, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tweets, formatCount } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatusPageProps {
  params: Promise<{ tweetId: string }>;
}

export default function StatusPage({ params }: StatusPageProps) {
  const { tweetId } = use(params);
  const router = useRouter();

  const tweet = tweets.find((t) => t.id === tweetId);

  if (!tweet) {
    notFound();
  }

  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <header className="sticky top-0 z-30 flex items-center gap-6 border-b border-zinc-200 bg-white/80 px-4 py-2 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Post</h1>
      </header>

      <article className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Link href={`/${tweet.author.username}`}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={tweet.author.avatarUrl} alt={tweet.author.name} />
                <AvatarFallback>{tweet.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/${tweet.author.username}`} className="flex items-center gap-1 font-bold hover:underline">
                {tweet.author.name}
                {tweet.author.verified && (
                  <svg viewBox="0 0 22 22" className="h-5 w-5 fill-sky-500">
                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                  </svg>
                )}
              </Link>
              <Link href={`/${tweet.author.username}`} className="text-zinc-500">
                @{tweet.author.username}
              </Link>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-sky-500/10 hover:text-sky-500">
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

        <p className="mt-4 whitespace-pre-wrap text-xl leading-relaxed">{tweet.content}</p>

        <div className="mt-4 flex items-center gap-1 text-sm text-zinc-500">
          <span>10:30 AM</span>
          <span>·</span>
          <span>Jan 18, 2026</span>
          <span>·</span>
          <span className="font-bold text-foreground">1.2M</span>
          <span>Views</span>
        </div>

        <div className="mt-4 flex gap-4 border-y border-zinc-200 py-4 text-sm dark:border-zinc-800">
          <span>
            <strong>{formatCount(retweetCount)}</strong>{" "}
            <span className="text-zinc-500">Reposts</span>
          </span>
          <span>
            <strong>142</strong>{" "}
            <span className="text-zinc-500">Quotes</span>
          </span>
          <span>
            <strong>{formatCount(likeCount)}</strong>{" "}
            <span className="text-zinc-500">Likes</span>
          </span>
          <span>
            <strong>89</strong>{" "}
            <span className="text-zinc-500">Bookmarks</span>
          </span>
        </div>

        <div className="flex justify-around border-b border-zinc-200 py-2 dark:border-zinc-800">
          <button
            className={cn(
              "group/btn flex items-center gap-2 rounded-full p-3",
              "text-zinc-500 transition-all duration-200",
              "hover:bg-sky-500/10 hover:text-sky-500"
            )}
          >
            <MessageCircle className="h-6 w-6 transition-transform group-hover/btn:scale-110" />
          </button>

          <button
            onClick={handleRetweet}
            className={cn(
              "group/btn flex items-center gap-2 rounded-full p-3",
              "transition-all duration-200",
              isRetweeted
                ? "text-green-500"
                : "text-zinc-500 hover:bg-green-500/10 hover:text-green-500"
            )}
          >
            <Repeat2 className="h-6 w-6 transition-transform group-hover/btn:scale-110" />
          </button>

          <button
            onClick={handleLike}
            className={cn(
              "group/btn flex items-center gap-2 rounded-full p-3",
              "transition-all duration-200",
              isLiked
                ? "text-rose-500"
                : "text-zinc-500 hover:bg-rose-500/10 hover:text-rose-500"
            )}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-transform group-hover/btn:scale-110",
                isLiked && "fill-current"
              )}
            />
          </button>

          <button
            onClick={handleBookmark}
            className={cn(
              "group/btn flex items-center gap-2 rounded-full p-3",
              "transition-all duration-200",
              isBookmarked
                ? "text-sky-500"
                : "text-zinc-500 hover:bg-sky-500/10 hover:text-sky-500"
            )}
          >
            <Bookmark
              className={cn(
                "h-6 w-6 transition-transform group-hover/btn:scale-110",
                isBookmarked && "fill-current"
              )}
            />
          </button>

          <button
            onClick={handleShare}
            className={cn(
              "group/btn flex items-center gap-2 rounded-full p-3",
              "text-zinc-500 transition-all duration-200",
              "hover:bg-sky-500/10 hover:text-sky-500"
            )}
          >
            <Share className="h-6 w-6 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </article>

      <div className="px-4 py-8 text-center text-zinc-500">
        <p>Replies coming soon</p>
      </div>
    </div>
  );
}
