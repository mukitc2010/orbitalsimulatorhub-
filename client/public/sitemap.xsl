<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — Orbital Simulator Hub | Free Space Education</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Space+Mono:wght@400&amp;display=swap" rel="stylesheet"/>
        <style>
          :root {
            --bg: #0f172a;
            --bg-card: #1e293b;
            --border: #334155;
            --text: #e2e8f0;
            --text-muted: #94a3b8;
            --accent: #38bdf8;
            --accent-cyan: #2dd4bf;
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 2rem;
            line-height: 1.6;
            min-height: 100vh;
          }
          .header {
            max-width: 1000px;
            margin: 0 auto 2rem;
          }
          h1 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #fff;
            margin: 0 0 0.25rem;
            letter-spacing: -0.02em;
          }
          .tagline {
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
          }
          .stats {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            font-size: 0.95rem;
            color: var(--text-muted);
          }
          .stats span { color: var(--accent-cyan); font-weight: 600; }
          a {
            color: var(--accent);
            text-decoration: none;
          }
          a:hover { text-decoration: underline; }
          .home-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text);
            font-size: 0.9rem;
            transition: border-color 0.2s, background 0.2s;
          }
          .home-link:hover { border-color: var(--accent); background: rgba(56,189,248,0.08); text-decoration: none; }
          .table-wrap {
            max-width: 1000px;
            margin: 0 auto;
            overflow-x: auto;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: var(--bg-card);
          }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--border); }
          th {
            background: var(--border);
            color: #fff;
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: rgba(56,189,248,0.08); }
          td.url { font-family: 'Space Mono', monospace; font-size: 0.85rem; word-break: break-all; }
          td.url a { color: var(--accent); }
          .priority { font-family: 'Space Mono', monospace; font-size: 0.9rem; color: var(--accent-cyan); }
          .badge { display: inline-block; padding: 0.2em 0.5em; border-radius: 4px; font-size: 0.75rem; font-weight: 500; }
          .badge-daily { background: rgba(34,197,94,0.2); color: #4ade80; }
          .badge-weekly { background: rgba(56,189,248,0.2); color: var(--accent); }
          .badge-monthly { background: rgba(148,163,184,0.2); color: var(--text-muted); }
          footer {
            max-width: 1000px;
            margin: 2rem auto 0;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            font-size: 0.85rem;
            color: var(--text-muted);
          }
          @media (max-width: 640px) {
            body { padding: 1rem; }
            th:nth-child(2), td:nth-child(2) { max-width: 200px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🛸 Sitemap — Orbital Simulator Hub</h1>
          <p class="tagline">Free space education for Africa, Americas, Asia, Europe</p>
          <div class="stats">
            <span><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
            <span>·</span>
            <span><a href="https://www.orbitalsimulatorhub.com/">orbitalsimulatorhub.com</a></span>
          </div>
          <a href="https://www.orbitalsimulatorhub.com/" class="home-link">← Back to Home</a>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Freq</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><xsl:value-of select="position()"/></td>
                  <td class="url">
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:changefreq='daily'"><span class="badge badge-daily">daily</span></xsl:when>
                      <xsl:when test="sitemap:changefreq='weekly'"><span class="badge badge-weekly">weekly</span></xsl:when>
                      <xsl:otherwise><span class="badge badge-monthly"><xsl:value-of select="sitemap:changefreq"/></span></xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
        <footer>
          <p>© Orbital Simulator Hub — Free 3D orbit simulator, NASA missions, astronaut database. For students worldwide.</p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
