'use client';
import { useLanguage } from './language-provider';

import { useState } from 'react';
import { ArrowUpRight, Heart, RotateCw } from 'lucide-react';
import { ActionButton } from './action-button';
import { Section, Surface } from './layout';
const experiments = [
  {
    id: 'hover',
    label: '01 / MICROINTERACCIÓN',
    title: 'Ese pequeño detalle.',
    copy: 'Pasa el cursor, enfoca o pulsa.',
    kind: 'hover',
  },
  {
    id: 'state',
    label: '02 / REACT STATE',
    title: 'Un estado. Una respuesta.',
    copy: 'Una interacción que se siente inmediata.',
    kind: 'state',
  },
  {
    id: 'motion',
    label: '03 / CSS MOTION',
    title: 'Movimiento con intención.',
    copy: 'Una transición, sin perder el foco.',
    kind: 'motion',
  },
] as const;
function ExperimentCard({
  experiment,
}: {
  experiment: (typeof experiments)[number];
}) {
  const { t } = useLanguage();

  const [active, setActive] = useState(false);
  return (
    <Surface className={`experiment experiment-${experiment.kind}`}>
      <div className="experiment-stage">
        {experiment.kind === 'hover' && (
          <ActionButton
            variant="outline"
            className={`hover-demo ${active ? 'is-active' : ''}`}
            aria-pressed={active}
            onClick={() => setActive((current) => !current)}
          >
            {active ? t('Conectado') : t('Haz clic')}{' '}
            <ArrowUpRight aria-hidden="true" />
          </ActionButton>
        )}
        {experiment.kind === 'state' && (
          <ActionButton
            variant="outline"
            className={`like-demo ${active ? 'is-active' : ''}`}
            aria-pressed={active}
            aria-label={active ? t('Quitar me gusta') : t('Me gusta')}
            onClick={() => setActive((current) => !current)}
          >
            <Heart aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
            {active ? t('Te gusta') : t('Me gusta')}
          </ActionButton>
        )}
        {experiment.kind === 'motion' && (
          <div className="motion-demo">
            <div
              className={`motion-shape ${active ? 'is-active' : ''}`}
              aria-hidden="true"
            />
            <ActionButton
              variant="ghost"
              className="action-icon"
              aria-label={t('Girar figura')}
              aria-pressed={active}
              onClick={() => setActive((current) => !current)}
            >
              <RotateCw aria-hidden="true" />
            </ActionButton>
          </div>
        )}
      </div>
      <div className="experiment-copy">
        <p className="eyebrow">{t(experiment.label)}</p>
        <h3>{t(experiment.title)}</h3>
        <p>{t(experiment.copy)}</p>
      </div>
    </Surface>
  );
}
export function Playground() {
  const { t } = useLanguage();

  return (
    <Section
      id="laboratorio"
      eyebrow="02 / Playground"
      title={t('¿Quieres probar interacciones?')}
      description={t(
        'Este es un espacio para ver microinteracciones, estados y animaciones.',
      )}
    >
      <div className="experiment-grid">
        {experiments.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </Section>
  );
}
