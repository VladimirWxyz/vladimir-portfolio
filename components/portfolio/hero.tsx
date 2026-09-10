import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile, technologies } from '@/data/portfolio';
import { ActionLink } from './action-link';
import { Tag } from './layout';
export function Hero() {
  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {profile.role}
          </p>
          <h1 id="hero-title">
            Hola!
            <br />
            Bienvenido a
            <br />
            <span className="gradient-text">Mi portafolio.</span>
          </h1>
          <p className="hero-copy">
            Soy {profile.name}. {profile.intro}
          </p>
          <div className="actions hero-actions">
            <ActionLink href="#proyectos">
              Ver proyectos <ArrowUpRight aria-hidden="true" />
            </ActionLink>
            <ActionLink href="#sobre-mi" variant="ghost">
              Conóceme <ArrowDown aria-hidden="true" />
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
            React + creatividad<small>Del componente a la experiencia.</small>
          </div>
          <div className="floating-note note-bottom">
            &lt;Ideas hechas interfaz /&gt;
            <small>Diseñar. Construir. Pulir.</small>
          </div>
        </div>
      </section>
      <section className="stack-strip" aria-labelledby="stack-title">
        <p className="eyebrow" id="stack-title">
          Mi stack /
        </p>
        {technologies.map((technology) => (
          <Tag key={technology}>{technology}</Tag>
        ))}
      </section>
    </div>
  );
}
