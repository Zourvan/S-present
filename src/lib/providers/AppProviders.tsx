"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
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

type AppPrefs = {
  locale: Locale;
  theme: ThemeMode;
  typeScale: number;
  textBold: boolean;
  ready: boolean;
};

const defaultPrefs: AppPrefs = {
  locale: "en",
  theme: "light",
  typeScale: TYPE_SCALE_DEFAULT,
  textBold: false,
  ready: false,
};

let prefs: AppPrefs = defaultPrefs;
const prefsListeners = new Set<() => void>();

function subscribePrefs(listener: () => void) {
  prefsListeners.add(listener);
  return () => {
    prefsListeners.delete(listener);
  };
}

function getPrefsSnapshot() {
  return prefs;
}

function getPrefsServerSnapshot() {
  return defaultPrefs;
}

function replacePrefs(next: AppPrefs) {
  prefs = next;
  for (const listener of prefsListeners) listener();
}

function patchPrefs(partial: Partial<AppPrefs>) {
  prefs = { ...prefs, ...partial };
  for (const listener of prefsListeners) listener();
}

function readStoredPrefs(): AppPrefs {
  const savedLocale = window.localStorage.getItem("gmp-locale");
  const savedTheme = window.localStorage.getItem("gmp-theme");
  const savedScale = window.localStorage.getItem("gmp-type-scale");
  const savedBold = window.localStorage.getItem("gmp-text-bold");
  let locale: Locale = "en";
  let theme: ThemeMode = "light";
  let typeScale = TYPE_SCALE_DEFAULT;
  let textBold = false;
  if (savedLocale === "en" || savedLocale === "fa") locale = savedLocale;
  if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
  if (savedScale != null) {
    const n = Number.parseInt(savedScale, 10);
    if (Number.isFinite(n)) typeScale = clampScale(n);
  }
  if (savedBold === "1" || savedBold === "true") textBold = true;
  return { locale, theme, typeScale, textBold, ready: true };
}

export function AppProviders({ children }: { children: ReactNode }) {
  const { locale, theme, typeScale, textBold, ready } = useSyncExternalStore(
    subscribePrefs,
    getPrefsSnapshot,
    getPrefsServerSnapshot,
  );

  useEffect(() => {
    if (prefs.ready) return;
    replacePrefs(readStoredPrefs());
  }, []);

  useEffect(() => {
    if (!ready) return;
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
  }, [locale, theme, typeScale, textBold, ready]);

  const setLocale = useCallback((next: Locale) => patchPrefs({ locale: next }), []);
  const setTheme = useCallback((next: ThemeMode) => patchPrefs({ theme: next }), []);
  const toggleLocale = useCallback(
    () =>
      patchPrefs({ locale: prefs.locale === "en" ? "fa" : "en" }),
    [],
  );
  const toggleTheme = useCallback(
    () =>
      patchPrefs({ theme: prefs.theme === "light" ? "dark" : "light" }),
    [],
  );
  const bumpTypeScale = useCallback((delta: -1 | 1) => {
    patchPrefs({ typeScale: clampScale(prefs.typeScale + delta) });
  }, []);
  const toggleTextBold = useCallback(() => {
    patchPrefs({ textBold: !prefs.textBold });
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
