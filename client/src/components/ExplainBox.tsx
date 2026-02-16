import type { ReactNode } from "react";

/**
 * Reusable callout to make a concept or page understandable at a glance.
 */
export function ExplainBox({
  title = "Key idea",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border-l-4 border-[var(--accent-cyan)] bg-slate-50 px-4 py-3 text-sm text-slate-700 ${className}`}
      role="complementary"
      aria-label={title}
    >
      <p className="font-semibold text-slate-800 mb-1">{title}</p>
      <div className="text-slate-700">{children}</div>
    </div>
  );
}
