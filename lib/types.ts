export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  verified: boolean;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

export interface Tweet {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  imageUrl?: string;
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  replyToId?: string;
}

export interface Notification {
  id: string;
  type: "like" | "retweet" | "follow" | "reply";
  actor: User;
  tweet?: Tweet;
  createdAt: string;
}

export interface TrendingTopic {
  id: string;
  name: string;
  category: string;
  postCount: string;
}
