import dailyContentData from '@/data/daily-content.json';

export interface TopicHighlight {
  title: string;
  blurb: string;
  icon: string;
}

export interface LatestPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface DailyContent {
  generated_at: string;
  featured_article: {
    title: string;
    excerpt: string;
    category: string;
    read_more_url: string;
  };
  did_you_know: string;
  topic_highlights: TopicHighlight[];
  latest_posts: LatestPost[];
  learning_paths: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export function getDailyContent(): DailyContent {
  return dailyContentData as DailyContent;
}
