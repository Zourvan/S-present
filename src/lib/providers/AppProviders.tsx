"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale, ThemeMode } from "../types";
import { t, type UiStrings } from "../i18n/strings";

/** Type scale steps applied to slide canvas (index into TYPE_SCALE_VALUES). */
export const TYPE_SCALE_MIN = 0;
export const TYPE_SCALE_MAX = 4;
export const TYPE_SCALE_DEFAULT = 2;
export const TYPE_SCALE_VALUES = [0.85, 0.925, 1, 1.12, 1.25] as const;

interface AppContextValue {
  locale: Locale;
  theme: ThemeMode;
  strings: UiStrings;
  typeScale: number;
  textBold: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
  bumpTypeScale: (delta: -1 | 1) => void;
  toggleTextBold: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function clampScale(n: number) {
  return Math.min(TYPE_SCALE_MAX, Math.max(TYPE_SCALE_MIN, n));
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [typeScale, setTypeScale] = useState(TYPE_SCALE_DEFAULT);
  const [textBold, setTextBold] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("gmp-locale") as Locale | null;
    const savedTheme = window.localStorage.getItem("gmp-theme") as ThemeMode | null;
    const savedScale = window.localStorage.getItem("gmp-type-scale");
    const savedBold = window.localStorage.getItem("gmp-text-bold");
    if (savedLocale === "en" || savedLocale === "fa") setLocaleState(savedLocale);
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    if (savedScale != null) {
      const n = Number.parseInt(savedScale, 10);
      if (Number.isFinite(n)) setTypeScale(clampScale(n));
    }
    if (savedBold === "1" || savedBold === "true") setTextBold(true);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.lang = locale;
    root.dir = locale === "fa" ? "rtl" : "ltr";
    root.classList.toggle("locale-fa", locale === "fa");
    root.dataset.typeScale = String(typeScale);
    root.dataset.textBold = textBold ? "true" : "false";
    root.style.setProperty(
      "--slide-type-scale",
      String(TYPE_SCALE_VALUES[typeScale] ?? 1),
    );
    window.localStorage.setItem("gmp-locale", locale);
    window.localStorage.setItem("gmp-theme", theme);
    window.localStorage.setItem("gmp-type-scale", String(typeScale));
    window.localStorage.setItem("gmp-text-bold", textBold ? "1" : "0");
  }, [locale, theme, typeScale, textBold, hydrated]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const setTheme = useCallback((next: ThemeMode) => setThemeState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "en" ? "fa" : "en")),
    [],
  );
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
    [],
  );
  const bumpTypeScale = useCallback((delta: -1 | 1) => {
    setTypeScale((prev) => clampScale(prev + delta));
  }, []);
  const toggleTextBold = useCallback(() => {
    setTextBold((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      theme,
      strings: t(locale),
      typeScale,
      textBold,
      setLocale,
      setTheme,
      toggleLocale,
      toggleTheme,
      bumpTypeScale,
      toggleTextBold,
    }),
    [
      locale,
      theme,
      typeScale,
      textBold,
      setLocale,
      setTheme,
      toggleLocale,
      toggleTheme,
      bumpTypeScale,
      toggleTextBold,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
