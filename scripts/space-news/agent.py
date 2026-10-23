"""Daily news desk: fetch -> date/source checks -> deduplicate -> group -> publish data.
Uses only the Python standard library. No generated scientific claims or API key.
"""
import argparse
import html
import json
import os
from pathlib import Path
import re
import sys
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / 'client/src/data/spaceNews.json'
FEEDS = {
    'NASA': 'https://www.nasa.gov/news-release/feed/',
    'NASA JPL': 'https://www.jpl.nasa.gov/feeds/news/',
    'ESA': 'https://www.esa.int/rssfeed/Our_Activities/Space_Science',
}
TOPICS = ['Earth', 'Mars', 'Neptune', 'Mercury', 'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Moon', 'Space']

def trusted_url(raw):
    try:
        u = urlsplit(raw)
        host = (u.hostname or '').lower()
        if u.scheme != 'https' or u.username or u.password or u.port not in (None, 443):
            return None
        if not any(host == d or host.endswith('.' + d) for d in ('nasa.gov', 'esa.int')):
            return None
        return urlunsplit((u.scheme, u.netloc.lower(), u.path, '', ''))
    except ValueError:
        return None

def clean_title(raw):
    text = re.sub(r'<[^>]+>', '', html.unescape(raw or ''))
    text = re.sub(r'\s+', ' ', text).strip()
    # Short attributed headlines only; avoid reproducing source articles.
    text = ' '.join(text.split()[:20])
    return re.sub(r'[\[\]<>`*_\\]', '', text)

def parse_feed(xml, source, now):
    if b'<!DOCTYPE' in xml.upper() or b'<!ENTITY' in xml.upper():
        raise ValueError('XML entities are not permitted')
    tree = ET.fromstring(xml)
    stories = []
    atom = {'a': 'http://www.w3.org/2005/Atom'}
    items = tree.findall('./channel/item') or tree.findall('a:entry', atom)
    for item in items:
        title = clean_title(item.findtext('title') or item.findtext('a:title', namespaces=atom))
        link = item.findtext('link')
        if not link:
            links = item.findall('a:link', atom)
            link = next((e.get('href') for e in links if e.get('rel', 'alternate') == 'alternate'), '')
        link = trusted_url(link or '')
        stamp = item.findtext('pubDate') or item.findtext('a:published', namespaces=atom) or item.findtext('a:updated', namespaces=atom)
        try:
            try:
                published = parsedate_to_datetime(stamp)
            except (ValueError, TypeError):
                published = datetime.fromisoformat(stamp.replace('Z', '+00:00'))
            if published.tzinfo is None:
                continue
        except (ValueError, TypeError, AttributeError):
            continue
        if not title or not link or not now - timedelta(hours=48) <= published <= now:
            continue
        topic = next((t for t in TOPICS[:-1] if re.search(r'\b' + t + r'\b', title + ' ' + link.replace('/', ' '), re.I)), 'Space')
        stories.append({'title': title, 'url': link, 'source': source, 'published': published.astimezone(timezone.utc).isoformat(), 'topic': topic})
    return stories

def select_stories(stories, previous):
    seen = {story['url'] for post in previous for story in post.get('sources', [])}
    titles = {story['title'].casefold() for post in previous for story in post.get('sources', [])}
    groups = {topic: [] for topic in TOPICS}
    for story in sorted(stories, key=lambda s: s['published'], reverse=True):
        if story['url'] in seen or story['title'].casefold() in titles:
            continue
        seen.add(story['url']); titles.add(story['title'].casefold())
        if len(groups[story['topic']]) < 2:
            groups[story['topic']].append(story)
    return [story for topic in TOPICS for story in groups[topic]][:12]

def build_post(stories, now, warnings):
    day = now.astimezone(ZoneInfo('America/New_York')).date().isoformat()
    content = [f'Daily space news desk for {day} (America/New_York).',
               'Attributed headlines published within the last 48 hours. Follow each source for the full reporting; publication dates are not necessarily event dates.']
    for topic in TOPICS:
        content.append(f'## {topic}')
        matches = [s for s in stories if s['topic'] == topic]
        content.extend(f"- [{s['title']}]({s['url']}) - {s['source']}, published {s['published'][:10]}." for s in matches)
        if not matches:
            content.append('No new eligible headline found in the checked feeds for this topic today.')
    if warnings:
        content.append('## Coverage note\nOne or more feeds were unavailable; this roundup has partial source coverage.')
    return {'slug': f'space-news-{day}', 'title': f'Daily Space News - {day}',
            'excerpt': f'{len(stories)} recent, attributed space headlines, grouped by planet and mission topic.',
            'content': '\n\n'.join(content), 'category': 'nasa-news', 'date': day,
            'tags': ['Space news', *sorted({s['topic'] for s in stories})], 'sources': stories}

def fetch_feed(url):
    request = Request(url, headers={'User-Agent': 'OrbitalSimulatorHub-NewsDesk/1.0'})
    with urlopen(request, timeout=25) as response:
        if not trusted_url(response.url):
            raise ValueError('Untrusted feed redirect')
        payload = response.read(2_000_001)
        if len(payload) > 2_000_000:
            raise ValueError('Feed exceeds size limit')
        return payload

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true', help='Write website data; default previews only')
    args = parser.parse_args()
    now = datetime.now(timezone.utc)
    previous = json.loads(OUTPUT.read_text(encoding='utf-8'))
    day = now.astimezone(ZoneInfo('America/New_York')).date().isoformat()
    if any(p['slug'] == f'space-news-{day}' for p in previous):
        print('Already prepared today; no duplicate created.'); return
    stories, warnings = [], []
    successes = 0
    for source, url in FEEDS.items():
        try:
            stories.extend(parse_feed(fetch_feed(url), source, now)); successes += 1
        except Exception as exc:
            warnings.append(source)
            print(f'{source}: feed unavailable ({type(exc).__name__})', file=sys.stderr)
    if not successes:
        raise RuntimeError('All feeds failed; no content written')
    selected = select_stories(stories, previous)
    if not selected:
        print('No fresh, unseen headlines; no post created.'); return
    post = build_post(selected, now, warnings)
    if args.write:
        temporary = OUTPUT.with_suffix('.tmp')
        temporary.write_text(json.dumps([post, *previous], ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        os.replace(temporary, OUTPUT)
        print(f"Prepared website post: {post['slug']}")
    else:
        print(json.dumps(post, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
