"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { formatCount } from "@/lib/mock-data";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
}

export function ProfileHeader({ user, isCurrentUser = false }: ProfileHeaderProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-30 flex items-center gap-6 border-b border-zinc-200 bg-white/80 px-4 py-2 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-zinc-500">
            {formatCount(user.followersCount)} followers
          </p>
        </div>
      </header>

      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600" />

        <div className="absolute -bottom-16 left-4">
          <Avatar className="h-32 w-32 border-4 border-white dark:border-zinc-900">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-end p-4">
          {isCurrentUser ? (
            <Button variant="outline" className="rounded-full font-bold">
              Edit profile
            </Button>
          ) : (
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? "outline" : "default"}
              className="rounded-full font-bold"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-12 px-4 pb-4">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold">{user.name}</h2>
          {user.verified && (
            <svg viewBox="0 0 22 22" className="h-5 w-5 fill-sky-500">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
            </svg>
          )}
        </div>
        <p className="text-zinc-500">@{user.username}</p>

        {user.bio && <p className="mt-3">{user.bio}</p>}

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <a href="#" className="text-sky-500 hover:underline">
              example.com
            </a>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Joined March 2020
          </span>
        </div>

        <div className="mt-3 flex gap-4 text-sm">
          <Link href="#" className="hover:underline">
            <strong>{formatCount(user.followingCount)}</strong>{" "}
            <span className="text-zinc-500">Following</span>
          </Link>
          <Link href="#" className="hover:underline">
            <strong>{formatCount(user.followersCount)}</strong>{" "}
            <span className="text-zinc-500">Followers</span>
          </Link>
        </div>
      </div>

      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex">
          <button className="flex-1 border-b-2 border-sky-500 py-4 font-bold">
            Posts
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Replies
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Media
          </button>
          <button className="flex-1 py-4 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            Likes
          </button>
        </div>
      </div>
    </div>
  );
}
