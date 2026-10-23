'use client';
import { useLanguage, usePortfolio } from './language-provider';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { technologies } from '@/data/portfolio';
import { ActionLink } from './action-link';
import { Tag } from './layout';
export function Hero() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {profile.role}
          </p>
          <h1 id="hero-title">
            {t('Hola!')}
            <br />
            {t('Bienvenido a')}
            <br />
            <span className="gradient-text">{t('Mi portafolio.')}</span>
          </h1>
          <p className="hero-copy">
            {t('Soy')} {profile.name}. {profile.intro}
          </p>
          <div className="actions hero-actions">
            <ActionLink href="#proyectos">
              {t('Ver proyectos')} <ArrowUpRight aria-hidden="true" />
            </ActionLink>
            <ActionLink href="#sobre-mi" variant="ghost">
              {t('Conóceme')} <ArrowDown aria-hidden="true" />
            </ActionLink>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-ring" />
          <div className="hero-orbit">
            <div className="hero-orb" />
          </div>
          <div className="floating-note note-top">
            {t('React + creatividad')}
            <small>{t('Del componente a la experiencia.')}</small>
          </div>
          <div className="floating-note note-bottom">
            {t('<Ideas hechas interfaz />')}
            <small>{t('Diseñar. Construir. Pulir.')}</small>
          </div>
        </div>
      </section>
      <section className="stack-strip" aria-labelledby="stack-title">
        <p className="eyebrow" id="stack-title">
          {t('Mi stack /')}
        </p>
        {technologies.map((technology) => (
          <Tag key={technology}>{technology}</Tag>
        ))}
      </section>
    </div>
  );
}
