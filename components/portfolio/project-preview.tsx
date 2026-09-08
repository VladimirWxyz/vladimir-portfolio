import { ArrowUpRight, CirclePlay, Plus } from 'lucide-react';
import type { Project, ProjectPreviewKind } from '@/data/portfolio';

function assertNever(value: never): never {
  throw new Error(`Vista de proyecto no soportada: ${String(value)}`);
}

function PreviewContent({ kind }: { kind: ProjectPreviewKind }) {
  switch (kind) {
    case 'characters':
      return (
        <>
          <p className="preview-title">
            Explora el
            <br />
            multiverso.
          </p>
          <p className="preview-subtitle">
            Busca y filtra personajes en tiempo real.
          </p>
          <div className="character-search">Buscar personaje...</div>
          <div className="character-grid">
            {[
              ['RS', 'Rick Sanchez', 'Vivo'],
              ['MS', 'Morty Smith', 'Vivo'],
              ['SM', 'Summer Smith', 'Vivo'],
            ].map(([initials, name, status]) => (
              <div className="character-card" key={name}>
                <span>{initials}</span>
                <strong>{name}</strong>
                <small>{status}</small>
              </div>
            ))}
          </div>
        </>
      );
    case 'finance':
      return (
        <>
          <p className="preview-title">
            Todo en orden.
            <br />
            Sin complicarte.
          </p>
          <p className="preview-subtitle">
            Tu espacio financiero, en perspectiva.
          </p>
          <div className="finance-grid">
            <div>
              <span>Balance de ejemplo</span>
              <strong>
                $2.480<span>,00</span>
              </strong>
              <div className="finance-bars">
                {[35, 60, 48, 78, 65, 92, 100].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="finance-goal">
              <span>Meta del mes</span>
              <div className="goal-ring">
                <strong>
                  72<span>%</span>
                </strong>
              </div>
              <span>Vas por buen camino</span>
            </div>
          </div>
        </>
      );
    case 'music':
      return (
        <>
          <p className="preview-title">
            Encuentra
            <br />
            tu ritmo.
          </p>
          <p className="preview-subtitle">Una colección para cada momento.</p>
          <div className="music-grid">
            {['Deep focus', 'Slow days'].map((title, index) => (
              <div key={title} className={`music-cover cover-${index}`}>
                <div className="music-disc" />
                <div>
                  <span>{title}</span>
                  <CirclePlay size={20} />
                </div>
              </div>
            ))}
          </div>
        </>
      );
    case 'notes':
      return (
        <>
          <p className="preview-title">
            Espacio para
            <br />
            tus ideas.
          </p>
          <p className="preview-subtitle">Captura lo que importa.</p>
          <div className="note-paper">
            <div>
              <span>Una idea para mañana</span>
              <Plus size={14} />
            </div>
            <p>
              Las mejores interfaces empiezan
              <br />
              con una pregunta sencilla.
            </p>
            <div className="note-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        </>
      );
    default:
      return assertNever(kind);
  }
}

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <figure
      className={`project-preview preview-${project.preview}`}
      aria-hidden="true"
    >
      <div className="preview-browser">
        <div className="preview-toolbar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{project.name.toLowerCase()}.design</span>
          <ArrowUpRight size={12} aria-hidden="true" />
        </div>
        <div className="preview-body">
          <div className="preview-brand">
            {project.name.toLowerCase()}
            <span className="preview-brand-dot">.</span>
          </div>
          <PreviewContent kind={project.preview} />
        </div>
      </div>
    </figure>
  );
}
