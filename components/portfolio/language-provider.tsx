'use client';

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { english } from '@/data/translations';
import { profile, projects } from '@/data/portfolio';
import { englishProjects } from '@/data/projects-en';

type Language = 'es' | 'en';
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
} | null>(null);
const storageKey = 'portfolio-language';
function readLanguage(): Language {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'es') return query;
  try {
    return localStorage.getItem(storageKey) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}
function subscribe(onChange: () => void) {
  window.addEventListener('portfolio-language-change', onChange);
  window.addEventListener('storage', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('portfolio-language-change', onChange);
    window.removeEventListener('storage', onChange);
    window.removeEventListener('popstate', onChange);
  };
}
const serverLanguage = (): Language => 'es';
const clientReady = () => true;
const serverReady = () => false;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    readLanguage,
    serverLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = 'Vladimir Williams — Frontend Developer';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        language === 'en'
          ? 'Interfaces with personality, built with React, TypeScript, JavaScript, HTML, and CSS. Vladimir Williams’s portfolio.'
          : 'Interfaces con personalidad, construidas con React, TypeScript, JavaScript, HTML y CSS. El portafolio de Vladimir Williams.',
      );
  }, [language]);

  function setLanguage(next: Language) {
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      /* The selector still works without storage. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event('portfolio-language-change'));
  }

  const t = (text: string) =>
    language === 'en' ? (english[text] ?? text) : text;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <a className="skip-link" href="#contenido">
        {t('Saltar al contenido')}
      </a>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}

export function usePortfolio() {
  const { language, t } = useLanguage();
  return {
    profile: { ...profile, intro: t(profile.intro), about: t(profile.about) },
    projects: language === 'en' ? englishProjects : projects,
  };
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  return (
    <fieldset className="language-switcher">
      <legend className="sr-only">
        {language === 'es' ? 'Idioma' : 'Language'}
      </legend>
      <button
        type="button"
        lang="es"
        aria-label="Español"
        aria-pressed={language === 'es'}
        disabled={!ready}
        onClick={() => setLanguage('es')}
      >
        ES
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === 'en'}
        disabled={!ready}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </fieldset>
  );
}
