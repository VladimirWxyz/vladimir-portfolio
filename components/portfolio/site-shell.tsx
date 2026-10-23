'use client';
import {
  useLanguage,
  usePortfolio,
  LanguageSwitcher,
} from './language-provider';

import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { ActionLink } from './action-link';
import { GitHubLogo, LinkedInLogo } from './brand-icons';
import { ProfileAvatar } from './profile-avatar';
export function SiteHeader() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  return (
    <header className="site-header" id="inicio">
      <div className="container header-inner">
        <div className="brand-lockup">
          <ProfileAvatar />
          <a
            className="brand"
            href="#inicio"
            aria-label={`${profile.name}, ${t('inicio')}`}
          >
            {profile.name}
          </a>
        </div>
        <nav className="site-nav" aria-label={t('Navegación principal')}>
          <a href="#proyectos">{t('Proyectos')}</a>
          <a href="#sobre-mi">{t('Sobre mí')}</a>
          <ActionLink href="#contacto" variant="outline">
            {t('Hablemos')} <ArrowUpRight aria-hidden="true" />
          </ActionLink>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
export function SiteFooter() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  return (
    <footer className="site-footer container">
      <span>
        {profile.name} / {profile.role}
      </span>
      <div className="footer-links">
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitHubLogo /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInLogo /> LinkedIn{' '}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        <a href="#inicio" className="actions">
          {t('Volver arriba')} <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
