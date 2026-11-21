import { Link } from "wouter";
import { getTodayTopic } from "../data/dailyTopics";

export function DailyTopicIcon() {
  const topic = getTodayTopic();

  if (!topic) {
    return null;
  }

  const content = (
    <div className="group block">
        <div className="relative inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-pink)]/20 border-2 border-[var(--accent-cyan)]/50 hover:border-[var(--accent-cyan)] hover:shadow-lg transition-all">
          <div className="text-4xl animate-pulse group-hover:scale-110 transition-transform">
            {topic.icon}
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">
              Today's Topic
            </div>
            <div className="text-sm font-bold text-slate-800 group-hover:text-[var(--accent-cyan)] transition">
              {topic.title}
            </div>
            <div className="text-xs text-slate-600 mt-1 line-clamp-1">
              {topic.description}
            </div>
          </div>
          <div className="ml-auto text-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 transition">
            →
          </div>
        </div>
    </div>
  );

  return topic.external ? (
    <a href={topic.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    <Link href={topic.learnMoreUrl} className="block">{content}</Link>
  );
}
