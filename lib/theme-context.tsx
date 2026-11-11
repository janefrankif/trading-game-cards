'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'gold' | 'cyan' | 'emerald' | 'platinum';

export interface ThemeColorConfig {
  id: AccentColor;
  name: string;
  tagline: string;
  recommended?: boolean;
  hex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  buttonShadow: string;
  textAccent: string;
  borderAccent: string;
  glowAccent: string;
}

export const ACCENT_PALETTES: Record<AccentColor, ThemeColorConfig> = {
  gold: {
    id: 'gold',
    name: 'Champagne Gold',
    tagline: 'Recommended: PSA 10 & Luxury Collector Slabs',
    recommended: true,
    hex: '#D97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-200',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    buttonHover: 'hover:bg-amber-600',
    buttonText: 'text-zinc-950 font-bold',
    buttonShadow: 'shadow-amber-500/25',
    textAccent: 'text-amber-600',
    borderAccent: 'border-amber-500',
    glowAccent: 'shadow-amber-500/20',
  },
  cyan: {
    id: 'cyan',
    name: 'Electric Cerulean',
    tagline: 'Modern Cyber Vault & Digital Exchange',
    hex: '#0284C7',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-200',
    buttonBg: 'bg-sky-600 hover:bg-sky-700',
    buttonHover: 'hover:bg-sky-700',
    buttonText: 'text-white font-bold',
    buttonShadow: 'shadow-sky-500/25',
    textAccent: 'text-sky-600',
    borderAccent: 'border-sky-500',
    glowAccent: 'shadow-sky-500/20',
  },
  emerald: {
    id: 'emerald',
    name: 'Vault Emerald',
    tagline: 'Institutional Security & Escrow Trust',
    hex: '#059669',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    buttonHover: 'hover:bg-emerald-700',
    buttonText: 'text-white font-bold',
    buttonShadow: 'shadow-emerald-600/25',
    textAccent: 'text-emerald-600',
    borderAccent: 'border-emerald-600',
    glowAccent: 'shadow-emerald-600/20',
  },
  platinum: {
    id: 'platinum',
    name: 'Obsidian Slate',
    tagline: 'Minimalist Monochrome High Contrast',
    hex: '#18181B',
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-800',
    badgeBorder: 'border-zinc-300',
    buttonBg: 'bg-zinc-900 hover:bg-zinc-800',
    buttonHover: 'hover:bg-zinc-800',
    buttonText: 'text-white font-bold',
    buttonShadow: 'shadow-zinc-900/20',
    textAccent: 'text-zinc-900',
    borderAccent: 'border-zinc-800',
    glowAccent: 'shadow-zinc-400/20',
  },
};

interface ThemeContextType {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  colors: ThemeColorConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  accent: 'gold',
  setAccent: () => {},
  colors: ACCENT_PALETTES.gold,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tcg_accent_color') as AccentColor;
        if (saved && ACCENT_PALETTES[saved]) {
          return saved;
        }
      } catch {
        // Ignore localStorage access errors
      }
    }
    return 'gold';
  });

  const handleSetAccent = (newAccent: AccentColor) => {
    setAccent(newAccent);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tcg_accent_color', newAccent);
      } catch {
        // Ignore localStorage access errors
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent: handleSetAccent,
        colors: ACCENT_PALETTES[accent],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
