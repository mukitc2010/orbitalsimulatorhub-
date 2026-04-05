'use client';

import { useTheme } from '@/components/ThemeProvider';
import { THEME_LABELS, THEME_PACKS, type ThemeId, type Density } from '@/lib/theme';
import { useCallback, useEffect, useState } from 'react';

const THEME_IDS: ThemeId[] = ['space-aurora', 'light-clean', 'nasa-blue', 'deep-purple', 'mars-red', 'earth-green'];

export default function SettingsThemePage() {
  const { settings, setTheme, setCustomColors, setDensity, saveTheme, variables } = useTheme();
  const [customPrimary, setCustomPrimary] = useState(settings?.primary ?? variables.primary);
  const [customBg, setCustomBg] = useState(settings?.bg ?? variables.bg);
  const [customCard, setCustomCard] = useState(settings?.card ?? variables.card);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCustomPrimary(settings?.primary ?? variables.primary);
    setCustomBg(settings?.bg ?? variables.bg);
    setCustomCard(settings?.card ?? variables.card);
  }, [settings?.primary, settings?.bg, settings?.card, variables.primary, variables.bg, variables.card]);

  const handleSelectPack = useCallback(
    (id: ThemeId) => {
      setTheme(id);
      setSaved(false);
    },
    [setTheme]
  );

  const handleCustomChange = useCallback(() => {
    setCustomColors({
      primary: customPrimary,
      bg: customBg,
      card: customCard,
    });
    setTheme('custom');
    setSaved(false);
  }, [customPrimary, customBg, customCard, setCustomColors, setTheme]);

  const handleSave = useCallback(() => {
    saveTheme({
      theme: settings?.theme ?? 'space-aurora',
      primary: settings?.theme === 'custom' ? customPrimary : undefined,
      bg: settings?.theme === 'custom' ? customBg : undefined,
      card: settings?.theme === 'custom' ? customCard : undefined,
      density: settings?.density ?? 'normal',
    });
    setSaved(true);
  }, [settings, customPrimary, customBg, customCard, saveTheme]);

  const densityOptions: Density[] = ['compact', 'normal', 'spacious'];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-app mb-2">Theme</h1>
      <p className="text-muted text-sm mb-8">Customize how the community looks. Changes apply instantly and are saved to your account.</p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-app mb-4">Theme packs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {THEME_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectPack(id)}
              className={`rounded-xl border-2 p-4 text-left transition ${
                settings?.theme === id
                  ? 'border-primary bg-card-hover'
                  : 'border-app bg-card hover:bg-card-hover'
              }`}
            >
              <span
                className="block h-10 w-full rounded-lg mb-3"
                style={{ background: THEME_PACKS[id].heroGradient ?? THEME_PACKS[id].primary }}
              />
              <span className="font-medium text-app">{THEME_LABELS[id]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-app mb-4">Custom colors</h2>
        <div className="rounded-xl border border-app bg-card p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted">
              Primary
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                onBlur={handleCustomChange}
                className="h-8 w-14 cursor-pointer rounded border border-app bg-transparent"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              Background
              <input
                type="color"
                value={customBg}
                onChange={(e) => setCustomBg(e.target.value)}
                onBlur={handleCustomChange}
                className="h-8 w-14 cursor-pointer rounded border border-app bg-transparent"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              Card
              <input
                type="color"
                value={customCard}
                onChange={(e) => setCustomCard(e.target.value)}
                onBlur={handleCustomChange}
                className="h-8 w-14 cursor-pointer rounded border border-app bg-transparent"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => {
              setCustomColors({ primary: customPrimary, bg: customBg, card: customCard });
              setTheme('custom');
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-app hover:opacity-90"
          >
            Apply custom
          </button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-app mb-4">Font density</h2>
        <div className="flex gap-2">
          {densityOptions.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDensity(d)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                (settings?.density ?? 'normal') === d ? 'bg-primary text-app' : 'border border-app bg-card text-app hover:bg-card-hover'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleSave}
        className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-app hover:opacity-90"
      >
        {saved ? 'Saved' : 'Save to my account'}
      </button>
    </div>
  );
}
