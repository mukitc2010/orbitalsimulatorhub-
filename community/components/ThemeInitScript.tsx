/**
 * Inline script runs before React to prevent theme flash. Reads localStorage and sets data-theme + CSS vars.
 */
const THEME_STORAGE_KEY = 'orbital-theme-settings';

const themeVars: Record<string, Record<string, string>> = {
  'space-aurora': {
    '--bg': '#070B14',
    '--card': '#0D1628',
    '--card-hover': '#12213A',
    '--border': '#1E3358',
    '--text': '#EAF2FF',
    '--muted': '#9FB2D6',
    '--primary': '#4AA8FF',
    '--secondary': '#8B5CFF',
    '--success': '#33D6A6',
    '--warning': '#FFC857',
    '--danger': '#FF4D6D',
  },
  'light-clean': {
    '--bg': '#F8FAFC',
    '--card': '#FFFFFF',
    '--card-hover': '#F1F5F9',
    '--border': '#E2E8F0',
    '--text': '#0F172A',
    '--muted': '#64748B',
    '--primary': '#0EA5E9',
    '--secondary': '#8B5CF6',
    '--success': '#10B981',
    '--warning': '#F59E0B',
    '--danger': '#EF4444',
  },
  'nasa-blue': { '--bg': '#0A1628', '--card': '#0F2744', '--card-hover': '#143259', '--border': '#1E4976', '--text': '#E0EDFF', '--muted': '#7B9BC7', '--primary': '#2E7CF6', '--secondary': '#5B8DEF', '--success': '#22C55E', '--warning': '#EAB308', '--danger': '#DC2626' },
  'deep-purple': { '--bg': '#0D0A14', '--card': '#16102A', '--card-hover': '#1E1640', '--border': '#2E2654', '--text': '#EDE9FF', '--muted': '#9F8FCF', '--primary': '#8B5CFF', '--secondary': '#A78BFA', '--success': '#34D399', '--warning': '#FBBF24', '--danger': '#F87171' },
  'mars-red': { '--bg': '#140A0A', '--card': '#1E1212', '--card-hover': '#2A1818', '--border': '#4A2828', '--text': '#FFEAEA', '--muted': '#C9A0A0', '--primary': '#E85D04', '--secondary': '#DC2F02', '--success': '#2D6A4F', '--warning': '#FFBA08', '--danger': '#FF4D6D' },
  'earth-green': { '--bg': '#06140A', '--card': '#0D1E14', '--card-hover': '#122A1A', '--border': '#1E3A2A', '--text': '#E8FFF0', '--muted': '#9FCFB4', '--primary': '#22C55E', '--secondary': '#33D6A6', '--success': '#16A34A', '--warning': '#EAB308', '--danger': '#EF4444' },
};

export function ThemeInitScript() {
  const script = `
(function() {
  var key = '${THEME_STORAGE_KEY}';
  try {
    var raw = localStorage.getItem(key);
    if (raw) {
      var s = JSON.parse(raw);
      var theme = s.theme || 'space-aurora';
      var root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (s.density) root.setAttribute('data-density', s.density);
      if (theme === 'custom' && s.primary) {
        root.style.setProperty('--bg', s.bg || '#070B14');
        root.style.setProperty('--card', s.card || '#0D1628');
        root.style.setProperty('--card-hover', s.cardHover || '#12213A');
        root.style.setProperty('--border', s.border || '#1E3358');
        root.style.setProperty('--text', s.text || '#EAF2FF');
        root.style.setProperty('--muted', s.muted || '#9FB2D6');
        root.style.setProperty('--primary', s.primary || '#4AA8FF');
        root.style.setProperty('--secondary', s.secondary || '#8B5CFF');
      } else {
        var vars = ${JSON.stringify(themeVars)};
        var t = vars[theme] || vars['space-aurora'];
        for (var k in t) root.style.setProperty(k, t[k]);
      }
    }
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
