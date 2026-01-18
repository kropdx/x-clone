import { User, Tweet, Notification, TrendingTopic } from "./types";

function getAvatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
}

export const currentUser: User = {
  id: "user-1",
  name: "Your Name",
  username: "yourhandle",
  avatarUrl: getAvatarUrl("Your Name"),
  verified: false,
  bio: "Building cool things with code. Dreaming in TypeScript.",
  followersCount: 1234,
  followingCount: 567,
};

export const users: User[] = [
  {
    id: "user-2",
    name: "Elon Musk",
    username: "elonmusk",
    avatarUrl: getAvatarUrl("Elon Musk"),
    verified: true,
    bio: "Mars & Cars, Chips & Dips",
    followersCount: 170000000,
    followingCount: 512,
  },
  {
    id: "user-3",
    name: "React",
    username: "reactjs",
    avatarUrl: getAvatarUrl("React"),
    verified: true,
    bio: "The library for web and native user interfaces.",
    followersCount: 2500000,
    followingCount: 0,
  },
  {
    id: "user-4",
    name: "Next.js",
    username: "nextjs",
    avatarUrl: getAvatarUrl("Next.js"),
    verified: true,
    bio: "The React Framework for the Web. By @vercel.",
    followersCount: 1800000,
    followingCount: 50,
  },
  {
    id: "user-5",
    name: "Tailwind CSS",
    username: "tailwindcss",
    avatarUrl: getAvatarUrl("Tailwind CSS"),
    verified: true,
    bio: "A utility-first CSS framework for rapid UI development.",
    followersCount: 950000,
    followingCount: 12,
  },
  {
    id: "user-6",
    name: "Vercel",
    username: "vercel",
    avatarUrl: getAvatarUrl("Vercel"),
    verified: true,
    bio: "Develop. Preview. Ship.",
    followersCount: 1200000,
    followingCount: 200,
  },
  {
    id: "user-7",
    name: "Dan Abramov",
    username: "dan_abramov",
    avatarUrl: getAvatarUrl("Dan Abramov"),
    verified: true,
    bio: "Working on @blaboratory. Co-authored Redux and Create React App.",
    followersCount: 780000,
    followingCount: 1500,
  },
  {
    id: "user-8",
    name: "Shadcn",
    username: "shadcn",
    avatarUrl: getAvatarUrl("Shadcn"),
    verified: true,
    bio: "Building @shadcn/ui. Design engineer.",
    followersCount: 450000,
    followingCount: 300,
  },
];

export const tweets: Tweet[] = [
  {
    id: "tweet-1",
    content: "Just mass-released 420 features. You're welcome.",
    author: users[0],
    createdAt: "2h",
    likeCount: 50000,
    retweetCount: 5000,
    replyCount: 2000,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-2",
    content:
      "React 19 is now stable! Check out the new features including useOptimistic, View Transitions, and improved server components.\n\nUpgrade guide: react.dev/blog/react-19",
    author: users[1],
    createdAt: "4h",
    likeCount: 12500,
    retweetCount: 3200,
    replyCount: 450,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true,
  },
  {
    id: "tweet-3",
    content:
      "Next.js 16 is here! New features:\n\n- Turbopack now stable\n- Improved caching\n- Better error overlay\n- Faster cold starts\n\nDocs: nextjs.org/blog/next-16",
    author: users[2],
    createdAt: "6h",
    likeCount: 8900,
    retweetCount: 2100,
    replyCount: 320,
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false,
  },
  {
    id: "tweet-4",
    content:
      "Tailwind CSS v4 is a game changer. The new @theme directive and CSS variables integration is *chef's kiss*",
    author: users[3],
    createdAt: "8h",
    likeCount: 6700,
    retweetCount: 1500,
    replyCount: 180,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-5",
    content:
      "Deployed 847 projects today. Just another Monday.\n\nBuild. Preview. Ship.",
    author: users[4],
    createdAt: "10h",
    likeCount: 4500,
    retweetCount: 890,
    replyCount: 120,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-6",
    content:
      "Hot take: useEffect is not the enemy. Misusing useEffect is the enemy. Know when to use it and when not to.",
    author: users[5],
    createdAt: "12h",
    likeCount: 15000,
    retweetCount: 2800,
    replyCount: 890,
    isLiked: true,
    isRetweeted: true,
    isBookmarked: false,
  },
  {
    id: "tweet-7",
    content:
      "New components just dropped:\n\n- Sidebar\n- Breadcrumb\n- Chart\n- Carousel\n\nAll copy-paste ready. ui.shadcn.com",
    author: users[6],
    createdAt: "14h",
    likeCount: 7800,
    retweetCount: 1900,
    replyCount: 250,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: true,
  },
  {
    id: "tweet-8",
    content:
      "The best code is the code you don't have to write.\n\nThe second best is code that's easy to delete.",
    author: users[0],
    createdAt: "1d",
    likeCount: 25000,
    retweetCount: 4500,
    replyCount: 560,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-9",
    content:
      "Reminder: Server Components are not Server-Side Rendering.\n\nSSR: Render once, hydrate on client\nRSC: Render on server, never hydrate\n\nBig difference.",
    author: users[1],
    createdAt: "1d",
    likeCount: 9200,
    retweetCount: 2100,
    replyCount: 380,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-10",
    content:
      "Ship it on Friday. We're built different.\n\n(Just kidding, we have really good observability)",
    author: users[4],
    createdAt: "1d",
    likeCount: 5600,
    retweetCount: 980,
    replyCount: 200,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-11",
    content:
      "TypeScript tip: Use `satisfies` when you want type checking without widening.\n\n```\nconst config = {\n  theme: 'dark'\n} satisfies Config;\n```\n\nNow `config.theme` is 'dark', not string.",
    author: users[5],
    createdAt: "2d",
    likeCount: 11000,
    retweetCount: 2400,
    replyCount: 150,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: true,
  },
  {
    id: "tweet-12",
    content:
      "Building in public update:\n\n- 500 new components shipped this week\n- Registry v2 coming soon\n- CLI improvements landing tomorrow\n\nThank you for all the support!",
    author: users[6],
    createdAt: "2d",
    likeCount: 8900,
    retweetCount: 1600,
    replyCount: 340,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-13",
    content: "The future is multimodal. This is just the beginning.",
    author: users[0],
    createdAt: "3d",
    likeCount: 85000,
    retweetCount: 12000,
    replyCount: 3500,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-14",
    content:
      "Performance tip: Use `loading='lazy'` on images below the fold. It's 2026, there's no excuse not to.",
    author: users[2],
    createdAt: "3d",
    likeCount: 3400,
    retweetCount: 780,
    replyCount: 90,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
  {
    id: "tweet-15",
    content:
      "New blog post: 'Why We're Betting on Rust for Our Infrastructure'\n\nTL;DR: Speed, safety, and a passionate community.",
    author: users[4],
    createdAt: "4d",
    likeCount: 6200,
    retweetCount: 1100,
    replyCount: 280,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "like",
    actor: users[0],
    tweet: tweets[0],
    createdAt: "1h",
  },
  {
    id: "notif-2",
    type: "retweet",
    actor: users[1],
    tweet: tweets[1],
    createdAt: "2h",
  },
  {
    id: "notif-3",
    type: "follow",
    actor: users[2],
    createdAt: "3h",
  },
  {
    id: "notif-4",
    type: "like",
    actor: users[3],
    tweet: tweets[2],
    createdAt: "4h",
  },
  {
    id: "notif-5",
    type: "reply",
    actor: users[4],
    tweet: {
      ...tweets[0],
      id: "reply-1",
      content: "This is actually incredible. The team has been working so hard!",
    },
    createdAt: "5h",
  },
  {
    id: "notif-6",
    type: "follow",
    actor: users[5],
    createdAt: "6h",
  },
  {
    id: "notif-7",
    type: "like",
    actor: users[6],
    tweet: tweets[3],
    createdAt: "8h",
  },
  {
    id: "notif-8",
    type: "retweet",
    actor: users[0],
    tweet: tweets[4],
    createdAt: "10h",
  },
  {
    id: "notif-9",
    type: "like",
    actor: users[1],
    tweet: tweets[5],
    createdAt: "12h",
  },
  {
    id: "notif-10",
    type: "follow",
    actor: users[6],
    createdAt: "1d",
  },
  {
    id: "notif-11",
    type: "reply",
    actor: users[3],
    tweet: {
      ...tweets[1],
      id: "reply-2",
      content: "Can't wait to try the new features in production!",
    },
    createdAt: "1d",
  },
  {
    id: "notif-12",
    type: "like",
    actor: users[2],
    tweet: tweets[6],
    createdAt: "2d",
  },
];

export const trending: TrendingTopic[] = [
  {
    id: "trend-1",
    name: "#BuildInPublic",
    category: "Technology",
    postCount: "12.5K posts",
  },
  {
    id: "trend-2",
    name: "#React19",
    category: "Programming",
    postCount: "45.2K posts",
  },
  {
    id: "trend-3",
    name: "Next.js 16",
    category: "Technology",
    postCount: "28.9K posts",
  },
  {
    id: "trend-4",
    name: "#100DaysOfCode",
    category: "Programming",
    postCount: "8.7K posts",
  },
  {
    id: "trend-5",
    name: "TypeScript",
    category: "Technology",
    postCount: "15.3K posts",
  },
  {
    id: "trend-6",
    name: "#WebDev",
    category: "Technology",
    postCount: "22.1K posts",
  },
  {
    id: "trend-7",
    name: "Tailwind v4",
    category: "Design",
    postCount: "9.4K posts",
  },
];

export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
