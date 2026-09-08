import { ArrowUpRight, Code2, Layers3, MousePointer2 } from 'lucide-react';
import { profile } from '@/data/portfolio';
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
  return (
    <Section
      id="sobre-mi"
      eyebrow="03 / Detrás del código"
      title="Pienso en componentes. Cuido la experiencia."
    >
      <div className="about-grid">
        <div className="about-copy">
          <p>{profile.about}</p>
          <p>
            Me interesa cómo se ve una idea, cómo se usa y cómo se construye.
            Disfruto conectar esas tres partes.
          </p>
        </div>
        <div className="approach-list">
          {approach.map(({ title, text, icon: Icon }) => (
            <Surface key={title} className="approach-item">
              <Icon size={20} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </Section>
  );
}
export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="contact-section container"
    >
      <div className="contact-banner">
        <div>
          <p className="eyebrow">De la idea al navegador</p>
          <h2 id="contact-title">
            Tu próxima interfaz
            <br />
            empieza con un hola.
          </h2>
        </div>
        <div className="contact-action">
          {profile.email ? (
            <ActionLink href={`mailto:${profile.email}`} variant="outline">
              Conectemos <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : profile.github ? (
            <ActionLink href={profile.github} external variant="outline">
              Encuéntrame en GitHub <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : profile.linkedin ? (
            <ActionLink href={profile.linkedin} external variant="outline">
              Conectemos en LinkedIn <ArrowUpRight aria-hidden="true" />
            </ActionLink>
          ) : !profile.whatsapp ? (
            <p>
              Pronto compartiré aquí
              <br />
              mi correo y mis redes.
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
