import unittest
import argparse
import json
import tempfile
import subprocess
import shutil
from pathlib import Path
from unittest.mock import patch
import agent
from datetime import datetime, timezone
from agent import parse_feed, select_stories, build_post, trusted_url

class NewsTests(unittest.TestCase):
    now = datetime(2026, 10, 23, 12, tzinfo=timezone.utc)
    def feed(self, title='Mars rover update', date='Fri, 23 Oct 2026 09:00:00 GMT', url='https://www.nasa.gov/mars/update/'):
        return f'<rss><channel><item><title>{title}</title><link>{url}</link><pubDate>{date}</pubDate></item></channel></rss>'.encode()
    def test_dates_and_topic(self):
        self.assertEqual(parse_feed(self.feed(), 'NASA', self.now)[0]['topic'], 'Mars')
        self.assertEqual(parse_feed(self.feed(date='Fri, 30 Oct 2026 09:00:00 GMT'), 'NASA', self.now), [])
        self.assertEqual(parse_feed(self.feed(date='Mon, 19 Oct 2026 09:00:00 GMT'), 'NASA', self.now), [])
        self.assertEqual(parse_feed(self.feed(date='bad'), 'NASA', self.now), [])
    def test_source_validation(self):
        for url in ['http://nasa.gov/a', 'https://nasa.gov.evil.test/a', 'https://evil.test/a', 'javascript:alert(1)']:
            self.assertIsNone(trusted_url(url))
    def test_duplicates(self):
        stories = parse_feed(self.feed(), 'NASA', self.now)
        self.assertEqual(len(select_stories(stories * 2, [])), 1)
        self.assertEqual(select_stories(stories, [{'sources': stories}]), [])
    def test_roundup_and_missing_planet(self):
        post = build_post(parse_feed(self.feed(), 'NASA', self.now), self.now, ['ESA'])
        self.assertIn('## Neptune', post['content'])
        self.assertIn('No new eligible', post['content'])
        self.assertIn('partial source coverage', post['content'])
        self.assertEqual(post['date'], '2026-10-23')
    def test_xml_entities(self):
        with self.assertRaises(ValueError):
            parse_feed(b'<!DOCTYPE rss><rss/>', 'NASA', self.now)
    def test_write_is_idempotent(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / 'news.json'
            output.write_text('[]', encoding='utf-8')
            feed = self.feed(date=datetime.now(timezone.utc).strftime('%a, %d %b %Y %H:%M:%S GMT'))
            with patch.object(agent, 'OUTPUT', output), patch.object(agent, 'fetch_feed', return_value=feed), patch('argparse.ArgumentParser.parse_args', return_value=argparse.Namespace(write=True)):
                agent.main()
                first = output.read_text(encoding='utf-8')
                agent.main()
                self.assertEqual(output.read_text(encoding='utf-8'), first)
                self.assertEqual(len(json.loads(first)), 1)
    def test_all_failed_feeds_leave_archive_intact(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / 'news.json'
            output.write_text('[]', encoding='utf-8')
            with patch.object(agent, 'OUTPUT', output), patch.object(agent, 'fetch_feed', side_effect=OSError('unavailable')), patch('argparse.ArgumentParser.parse_args', return_value=argparse.Namespace(write=True)):
                with self.assertRaises(RuntimeError): agent.main()
                self.assertEqual(output.read_text(encoding='utf-8'), '[]')
    def test_news_roundup_is_included_in_rss(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'scripts').mkdir()
            (root / 'client/src/data').mkdir(parents=True)
            (root / 'client/public/blog').mkdir(parents=True)
            (root / 'package.json').write_text('{"type":"module"}', encoding='utf-8')
            (root / 'client/src/data/blogPosts.ts').write_text('export const BLOG_POSTS = [];', encoding='utf-8')
            post = build_post(parse_feed(self.feed(), 'NASA', self.now), self.now, [])
            (root / 'client/src/data/spaceNews.json').write_text(json.dumps([post]), encoding='utf-8')
            shutil.copy(agent.ROOT / 'scripts/generate-rss.js', root / 'scripts/generate-rss.js')
            subprocess.run(['node', str(root / 'scripts/generate-rss.js')], check=True, capture_output=True)
            rss = (root / 'client/public/rss.xml').read_text(encoding='utf-8')
            self.assertIn(post['slug'], rss)
            self.assertIn(post['title'], rss)
    def test_atom(self):
        xml = b'<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Neptune research</title><link href="https://www.esa.int/neptune"/><published>2026-10-23T01:00:00Z</published></entry></feed>'
        self.assertEqual(parse_feed(xml, 'ESA', self.now)[0]['topic'], 'Neptune')

if __name__ == '__main__': unittest.main()
