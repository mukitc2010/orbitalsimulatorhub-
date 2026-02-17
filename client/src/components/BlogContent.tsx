import { Link } from "wouter";

const LINK_CLASS = "text-[var(--accent-cyan)] hover:underline font-medium cursor-pointer";

/**
 * Renders blog post content with clickable links.
 * - [text](url): markdown links — internal (/) use Link; external use <a> with target="_blank"
 * - Bare URLs (https://... or http://...) are auto-linked so they navigate or open the referral page
 * - **text** rendered as bold
 */
export function BlogContent({ content }: { content: string }) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s<>\]()]+)/g;
  const boldRegex = /\*\*([^*]+)\*\*/g;

  function makeLink(href: string, label: React.ReactNode, key: string | number) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link key={key} href={href}>
          <a className={LINK_CLASS}>{label}</a>
        </Link>
      );
    }
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {label}
      </a>
    );
  }

  function renderInline(text: string, keyPrefix = ""): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    const re = new RegExp(linkRegex.source, "g");
    while ((match = re.exec(text)) !== null) {
      const [, label, url] = match;
      if (match.index > lastIndex) {
        parts.push(...renderBoldAndUrls(text.slice(lastIndex, match.index), keyPrefix + "-pre-" + match.index));
      }
      const href = url.trim();
      parts.push(makeLink(href, label, keyPrefix + "-md-" + match.index));
      lastIndex = re.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(...renderBoldAndUrls(text.slice(lastIndex), keyPrefix + "-tail"));
    }
    return parts;
  }

  /** Renders bold and also turns bare https?:// URLs into clickable links. */
  function renderBoldAndUrls(str: string, keyPrefix = ""): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const re = new RegExp(urlRegex.source, "g");
    let match;
    while ((match = re.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(...renderBold(str.slice(lastIndex, match.index)));
      }
      parts.push(makeLink(match[1], match[1], keyPrefix + "-url-" + match.index));
      lastIndex = re.lastIndex;
    }
    if (lastIndex < str.length) {
      parts.push(...renderBold(str.slice(lastIndex)));
    }
    return parts.length ? parts : renderBold(str);
  }

  function renderBold(str: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    const re = new RegExp(boldRegex.source, "g");
    while ((match = re.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.slice(lastIndex, match.index));
      }
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = re.lastIndex;
    }
    if (lastIndex < str.length) {
      parts.push(str.slice(lastIndex));
    }
    return parts.length ? parts : [str];
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: React.ReactNode[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${i}`} className="list-disc pl-6 my-2 space-y-1">{listItems}</ul>);
      listItems = [];
      i++;
    }
  }

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    const isBlank = line.trim() === "";

    if (isBlank) {
      flushList();
      elements.push(<br key={`br-${i}`} />);
      i++;
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**") && line.length > 4 && !line.slice(2, -2).includes("**")) {
      flushList();
      elements.push(
        <h3 key={i} className="text-base font-bold text-slate-800 mt-4 mb-1">
          {line.slice(2, -2)}
        </h3>
      );
    } else if (line.match(/^[-*]\s/)) {
      const bulletContent = line.replace(/^[-*]\s+/, "");
      listItems.push(
        <li key={listItems.length} className="text-slate-700">
          {renderInline(bulletContent, `line-${j}`)}
        </li>
      );
      continue;
    } else {
      flushList();
      elements.push(
        <p key={i} className="mb-2">
          {renderInline(line, `p-${i}`)}
        </p>
      );
    }
    i++;
  }
  flushList();

  return (
    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
      {elements}
    </div>
  );
}
