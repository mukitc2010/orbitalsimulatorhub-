import posts from "./homeFeed.json";

export interface HomeFeedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl?: string;
}

export const HOME_FEED: HomeFeedPost[] = posts;
