'use client';
import { useLanguage, usePortfolio } from './language-provider';

import { ArrowUpRight, Code2, Layers3, MousePointer2 } from 'lucide-react';
import { ActionLink } from './action-link';
import { Section, Surface } from './layout';
import { WhatsAppLogo } from './brand-icons';
const approach = [
  {
    title: 'Estructura clara',
    text: 'Componentes pequeños, responsabilidades definidas.',
    icon: Layers3,
  },
  {
    title: 'Interacción cuidada',
    text: 'Teclado, móvil y los detalles entre cada estado.',
    icon: MousePointer2,
  },
  {
    title: 'Código que crece',
    text: 'React, TypeScript y CSS con una base coherente.',
    icon: Code2,
  },
];
export function About() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  return (
    <Section
      id="sobre-mi"
      eyebrow={t('03 / Detrás del código')}
      title={t('Pienso en la experiencia y, construyo el código.')}
    >
      <div className="about-grid">
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>
            {t(
              'Visualizo cómo se ve una idea, cómo podría usarla, y cómo se construye. Disfruto conectar esas tres partes.',
            )}
          </p>
        </div>
        <div className="approach-list">
          {approach.map(({ title, text, icon: Icon }) => (
            <Surface key={title} className="approach-item">
              <Icon size={20} aria-hidden="true" />
              <div>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Section>
  );
}
export function Contact() {
  const { t } = useLanguage();
  const { profile } = usePortfolio();

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="contact-section container"
    >
      <div className="contact-banner">
        <div>
          <p className="eyebrow">{t('De la idea al navegador')}</p>
          <h2 id="contact-title">
            {t('Tu próxima interfaz')}
            <br />
            {t('empieza con un hola.')}
          </h2>
        </div>
        <div className="contact-action">
          {profile.email ? (
            <ActionLink href={`mailto:${profile.email}`} variant="outline">
              {t('Conectemos')} <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : profile.github ? (
            <ActionLink href={profile.github} external variant="outline">
              {t('Encuéntrame en GitHub')} <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : profile.linkedin ? (
            <ActionLink href={profile.linkedin} external variant="outline">
              {t('Conectemos en LinkedIn')} <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : !profile.whatsapp ? (
            <p>
              {t('Pronto compartiré aquí')}
              <br />
              {t('mi correo y mis redes.')}
            </p>
          ) : null}
          {profile.whatsapp && (
            <ActionLink href={profile.whatsapp} external variant="outline">
              <WhatsAppLogo /> WhatsApp <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          )}
        </div>
      </div>
    </section>
  );
}
