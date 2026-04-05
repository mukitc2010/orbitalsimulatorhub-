/**
 * Global theme system: theme packs + custom.
 * data-theme values: space-aurora (default), light-clean, nasa-blue, deep-purple, mars-red, earth-green, custom
 */

export type ThemeId =
  | 'space-aurora'
  | 'light-clean'
  | 'nasa-blue'
  | 'deep-purple'
  | 'mars-red'
  | 'earth-green'
  | 'custom';

export type Density = 'compact' | 'normal' | 'spacious';

export interface ThemeVariables {
  bg: string;
  card: string;
  cardHover: string;
  border: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  heroGradient?: string;
}

export interface ThemeSettings {
  theme: ThemeId;
  primary?: string;
  bg?: string;
  card?: string;
  cardHover?: string;
  border?: string;
  text?: string;
  muted?: string;
  secondary?: string;
  density?: Density;
}

export const THEME_PACKS: Record<Exclude<ThemeId, 'custom'>, ThemeVariables> = {
  'space-aurora': {
    bg: '#070B14',
    card: '#0D1628',
    cardHover: '#12213A',
    border: '#1E3358',
    text: '#EAF2FF',
    muted: '#9FB2D6',
    primary: '#4AA8FF',
    secondary: '#8B5CFF',
    success: '#33D6A6',
    warning: '#FFC857',
    danger: '#FF4D6D',
    heroGradient: 'linear-gradient(90deg, #4AA8FF 0%, #8B5CFF 50%, #33D6A6 100%)',
  },
  'light-clean': {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    cardHover: '#F1F5F9',
    border: '#E2E8F0',
    text: '#0F172A',
    muted: '#64748B',
    primary: '#0EA5E9',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    heroGradient: 'linear-gradient(90deg, #0EA5E9 0%, #8B5CF6 50%, #10B981 100%)',
  },
  'nasa-blue': {
    bg: '#0A1628',
    card: '#0F2744',
    cardHover: '#143259',
    border: '#1E4976',
    text: '#E0EDFF',
    muted: '#7B9BC7',
    primary: '#2E7CF6',
    secondary: '#5B8DEF',
    success: '#22C55E',
    warning: '#EAB308',
    danger: '#DC2626',
    heroGradient: 'linear-gradient(90deg, #2E7CF6 0%, #5B8DEF 50%, #0EA5E9 100%)',
  },
  'deep-purple': {
    bg: '#0D0A14',
    card: '#16102A',
    cardHover: '#1E1640',
    border: '#2E2654',
    text: '#EDE9FF',
    muted: '#9F8FCF',
    primary: '#8B5CFF',
    secondary: '#A78BFA',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
    heroGradient: 'linear-gradient(90deg, #8B5CFF 0%, #A78BFA 50%, #C084FC 100%)',
  },
  'mars-red': {
    bg: '#140A0A',
    card: '#1E1212',
    cardHover: '#2A1818',
    border: '#4A2828',
    text: '#FFEAEA',
    muted: '#C9A0A0',
    primary: '#E85D04',
    secondary: '#DC2F02',
    success: '#2D6A4F',
    warning: '#FFBA08',
    danger: '#FF4D6D',
    heroGradient: 'linear-gradient(90deg, #E85D04 0%, #DC2F02 50%, #9D0208 100%)',
  },
  'earth-green': {
    bg: '#06140A',
    card: '#0D1E14',
    cardHover: '#122A1A',
    border: '#1E3A2A',
    text: '#E8FFF0',
    muted: '#9FCFB4',
    primary: '#22C55E',
    secondary: '#33D6A6',
    success: '#16A34A',
    warning: '#EAB308',
    danger: '#EF4444',
    heroGradient: 'linear-gradient(90deg, #22C55E 0%, #33D6A6 50%, #0EA5E9 100%)',
  },
};

export const THEME_LABELS: Record<Exclude<ThemeId, 'custom'>, string> = {
  'space-aurora': 'Space Aurora',
  'light-clean': 'Light Clean',
  'nasa-blue': 'NASA Blue',
  'deep-purple': 'Deep Purple',
  'mars-red': 'Mars Red',
  'earth-green': 'Earth Green',
};

export const DEFAULT_THEME: ThemeId = 'space-aurora';

export function getThemeVariables(settings: ThemeSettings | null): ThemeVariables {
  if (!settings || settings.theme === 'custom') {
    const custom = settings?.theme === 'custom' ? settings : null;
    return {
      bg: custom?.bg ?? THEME_PACKS['space-aurora'].bg,
      card: custom?.card ?? THEME_PACKS['space-aurora'].card,
      cardHover: custom?.cardHover ?? THEME_PACKS['space-aurora'].cardHover,
      border: custom?.border ?? THEME_PACKS['space-aurora'].border,
      text: custom?.text ?? THEME_PACKS['space-aurora'].text,
      muted: custom?.muted ?? THEME_PACKS['space-aurora'].muted,
      primary: custom?.primary ?? THEME_PACKS['space-aurora'].primary,
      secondary: custom?.secondary ?? THEME_PACKS['space-aurora'].secondary,
      success: THEME_PACKS['space-aurora'].success,
      warning: THEME_PACKS['space-aurora'].warning,
      danger: THEME_PACKS['space-aurora'].danger,
      heroGradient: THEME_PACKS['space-aurora'].heroGradient,
    };
  }
  return THEME_PACKS[settings.theme];
}

export function applyThemeToDocument(settings: ThemeSettings | null) {
  if (typeof document === 'undefined') return;
  const vars = getThemeVariables(settings);
  const root = document.documentElement;
  root.setAttribute('data-theme', settings?.theme ?? DEFAULT_THEME);
  root.style.setProperty('--bg', vars.bg);
  root.style.setProperty('--card', vars.card);
  root.style.setProperty('--card-hover', vars.cardHover);
  root.style.setProperty('--border', vars.border);
  root.style.setProperty('--text', vars.text);
  root.style.setProperty('--muted', vars.muted);
  root.style.setProperty('--primary', vars.primary);
  root.style.setProperty('--secondary', vars.secondary);
  root.style.setProperty('--success', vars.success);
  root.style.setProperty('--warning', vars.warning);
  root.style.setProperty('--danger', vars.danger);
  if (vars.heroGradient) root.style.setProperty('--hero-gradient', vars.heroGradient);
  const density = settings?.density ?? 'normal';
  root.setAttribute('data-density', density);
}

const STORAGE_KEY = 'orbital-theme-settings';

export function loadThemeFromStorage(): ThemeSettings | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ThemeSettings;
  } catch {
    return null;
  }
}

export function saveThemeToStorage(settings: ThemeSettings) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}
