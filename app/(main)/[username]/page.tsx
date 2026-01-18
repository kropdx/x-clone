import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header";
import { TweetCard } from "@/components/tweet-card";
import { users, currentUser, tweets } from "@/lib/mock-data";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const user =
    username === currentUser.username
      ? currentUser
      : users.find((u) => u.username === username);

  if (!user) {
    notFound();
  }

  const userTweets = tweets.filter((tweet) => tweet.author.username === username);

  return (
    <div>
      <ProfileHeader
        user={user}
        isCurrentUser={username === currentUser.username}
      />

      <div>
        {userTweets.length > 0 ? (
          userTweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        ) : (
          <div className="px-8 py-16 text-center">
            <h2 className="text-2xl font-bold">No posts yet</h2>
            <p className="mt-2 text-zinc-500">
              When @{username} posts, their posts will show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
