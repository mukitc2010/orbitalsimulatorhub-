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
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    hackernews: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20this%20out:%20${encodedUrl}`,
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

  const base = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:scale-105 hover:shadow-md";
  const reddit = `${base} bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/40`;
  const twitter = `${base} bg-sky-500/15 text-sky-400 border border-sky-500/40`;
  const linkedin = `${base} bg-blue-600/15 text-blue-400 border border-blue-600/40`;
  const facebook = `${base} bg-blue-700/15 text-blue-500 border border-blue-700/40`;
  const whatsapp = `${base} bg-green-600/15 text-green-400 border border-green-600/40`;
  const telegram = `${base} bg-sky-600/15 text-sky-400 border border-sky-600/40`;
  const hn = `${base} bg-orange-500/15 text-orange-400 border border-orange-500/40`;
  const email = `${base} bg-slate-500/15 text-slate-300 border border-slate-500/40`;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        <a href={urls.reddit} target="_blank" rel="noopener noreferrer" className={reddit}>Reddit</a>
        <a href={urls.twitter} target="_blank" rel="noopener noreferrer" className={twitter}>X</a>
        <a href={urls.whatsapp} target="_blank" rel="noopener noreferrer" className={whatsapp}>WhatsApp</a>
        <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className={linkedin}>LinkedIn</a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 p-5" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.8) 100%)", borderColor: "var(--accent-cyan, #00d9ff)" }}>
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-cyan, #00d9ff)" }}>Share this page</p>
      <div className="flex flex-wrap gap-2">
        <a href={urls.reddit} target="_blank" rel="noopener noreferrer" className={reddit}>Reddit</a>
        {showRedditSubs && (
          <>
            <a href={urls.redditSpace} target="_blank" rel="noopener noreferrer" className={`${reddit} text-xs`}>r/space</a>
            <a href={urls.redditAstronomy} target="_blank" rel="noopener noreferrer" className={`${reddit} text-xs`}>r/astronomy</a>
            <a href={urls.redditNasa} target="_blank" rel="noopener noreferrer" className={`${reddit} text-xs`}>r/nasa</a>
          </>
        )}
        <a href={urls.twitter} target="_blank" rel="noopener noreferrer" className={twitter}>X / Twitter</a>
        <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className={linkedin}>LinkedIn</a>
        <a href={urls.facebook} target="_blank" rel="noopener noreferrer" className={facebook}>Facebook</a>
        <a href={urls.whatsapp} target="_blank" rel="noopener noreferrer" className={whatsapp}>WhatsApp</a>
        <a href={urls.telegram} target="_blank" rel="noopener noreferrer" className={telegram}>Telegram</a>
        <a href={urls.hackernews} target="_blank" rel="noopener noreferrer" className={hn}>Hacker News</a>
        <a href={urls.email} className={email}>Email</a>
      </div>
    </div>
  );
}
