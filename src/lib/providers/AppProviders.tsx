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

interface AppContextValue {
  locale: Locale;
  theme: ThemeMode;
  strings: UiStrings;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("gmp-locale") as Locale | null;
    const savedTheme = window.localStorage.getItem("gmp-theme") as ThemeMode | null;
    if (savedLocale === "en" || savedLocale === "fa") setLocaleState(savedLocale);
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.lang = locale;
    root.dir = locale === "fa" ? "rtl" : "ltr";
    root.classList.toggle("locale-fa", locale === "fa");
    window.localStorage.setItem("gmp-locale", locale);
    window.localStorage.setItem("gmp-theme", theme);
  }, [locale, theme, hydrated]);

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

  const value = useMemo(
    () => ({
      locale,
      theme,
      strings: t(locale),
      setLocale,
      setTheme,
      toggleLocale,
      toggleTheme,
    }),
    [locale, theme, setLocale, setTheme, toggleLocale, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
