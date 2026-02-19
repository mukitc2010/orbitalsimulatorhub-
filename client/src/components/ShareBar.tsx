/**
 * ShareBar — Reddit, Twitter, etc. for link previews and Reddit search visibility.
 * When users share on Reddit, the link gets indexed; Reddit search finds posts linking here.
 */
const SITE_URL = "https://www.orbitalsimulatorhub.com";
const DEFAULT_TITLE = "Orbital Simulator Hub – Free 3D Satellite Orbit Simulator & Space Education";

function getShareUrls(path = "/", title = DEFAULT_TITLE) {
  const url = path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    redditSpace: `https://www.reddit.com/r/space/submit?url=${encodedUrl}&title=${encodedTitle}`,
    redditAstronomy: `https://www.reddit.com/r/astronomy/submit?url=${encodedUrl}&title=${encodedTitle}`,
    redditNasa: `https://www.reddit.com/r/nasa/submit?url=${encodedUrl}&title=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

export function ShareBar({
  path = "/",
  title = DEFAULT_TITLE,
  compact = false,
  showRedditSubs = false,
}: {
  path?: string;
  title?: string;
  compact?: boolean;
  showRedditSubs?: boolean;
}) {
  const urls = getShareUrls(path, title);

  const baseClass = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-90";
  const redditClass = `${baseClass} bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/40`;
  const twitterClass = `${baseClass} bg-sky-500/15 text-sky-600 border border-sky-500/40`;
  const linkedinClass = `${baseClass} bg-blue-600/15 text-blue-600 border border-blue-600/40`;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        <a href={urls.reddit} target="_blank" rel="noopener noreferrer" className={redditClass} title="Share on Reddit">
          Reddit
        </a>
        <a href={urls.twitter} target="_blank" rel="noopener noreferrer" className={twitterClass} title="Share on X/Twitter">
          X
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Share on Reddit & social</p>
      <div className="flex flex-wrap gap-2">
        <a href={urls.reddit} target="_blank" rel="noopener noreferrer" className={redditClass} title="Share on Reddit">
          Reddit
        </a>
        {showRedditSubs && (
          <>
            <a href={urls.redditSpace} target="_blank" rel="noopener noreferrer" className={`${redditClass} text-xs`} title="Share to r/space">
              r/space
            </a>
            <a href={urls.redditAstronomy} target="_blank" rel="noopener noreferrer" className={`${redditClass} text-xs`} title="Share to r/astronomy">
              r/astronomy
            </a>
            <a href={urls.redditNasa} target="_blank" rel="noopener noreferrer" className={`${redditClass} text-xs`} title="Share to r/nasa">
              r/nasa
            </a>
          </>
        )}
        <a href={urls.twitter} target="_blank" rel="noopener noreferrer" className={twitterClass} title="Share on X/Twitter">
          X
        </a>
        <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className={linkedinClass} title="Share on LinkedIn">
          LinkedIn
        </a>
        <a href={urls.facebook} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-blue-700/15 text-blue-700 border border-blue-700/40`} title="Share on Facebook">
          Facebook
        </a>
      </div>
    </div>
  );
}
