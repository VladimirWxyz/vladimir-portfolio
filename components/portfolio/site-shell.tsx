import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { ActionLink } from './action-link';
import { profile } from '@/data/portfolio';
import { GitHubLogo, LinkedInLogo } from './brand-icons';
import { ProfileAvatar } from './profile-avatar';
export function SiteHeader() {
  return (
    <header className="site-header" id="inicio">
      <div className="container header-inner">
        <div className="brand-lockup">
          <ProfileAvatar />
          <a
            className="brand"
            href="#inicio"
            aria-label={`${profile.name}, inicio`}
          >
            {profile.name}
          </a>
        </div>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#sobre-mi">Sobre mí</a>
          <ActionLink href="#contacto" variant="outline">
            Hablemos <ArrowUpRight aria-hidden="true" />
          </ActionLink>
        </nav>
      </div>
    </header>
  );
}
export function SiteFooter() {
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
          Volver arriba <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
