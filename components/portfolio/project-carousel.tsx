'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Pause,
  Play,
  X,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { projects, type Project } from '@/data/portfolio';
import { ActionButton } from './action-button';
import { ActionLink } from './action-link';
import { Section, Surface, Tag } from './layout';
import { ProjectPreview } from './project-preview';
import { ProjectGallery } from './project-gallery';
import { useCarouselWheel } from './use-carousel-wheel';

function shouldJump() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ProjectCover({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const cover = project.images?.[0];
  if (!cover) return <ProjectPreview project={project} />;

  return (
    <figure className="project-photo">
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width ?? 900}
        height={cover.height ?? 1252}
        sizes="(max-width: 720px) calc(100vw - 4rem), 46vw"
        priority={priority}
      />
      <figcaption>{cover.caption}</figcaption>
    </figure>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger render={<ActionButton />}>
        Ver proyecto <ArrowUpRight aria-hidden="true" />
      </DialogTrigger>
      <DialogContent
        className={`project-dialog${project.images ? ' project-dialog-gallery' : ''}`}
        showCloseButton={false}
      >
        <DialogClose
          render={
            <ActionButton
              variant="outline"
              className="action-icon dialog-close"
              aria-label="Cerrar proyecto"
            />
          }
        >
          <X aria-hidden="true" />
        </DialogClose>
        <p className="eyebrow">
          {project.isConcept ? 'Concepto de interfaz' : project.category}
        </p>
        <DialogTitle className="dialog-title">{project.name}</DialogTitle>
        <DialogDescription className="dialog-description">
          {project.summary}
        </DialogDescription>
        {project.collaboration && (
          <p className="project-collaboration">{project.collaboration}</p>
        )}
        {project.images ? (
          <ProjectGallery images={project.images} projectName={project.name} />
        ) : (
          <ProjectPreview project={project} />
        )}
        <div className="project-detail-copy">
          <h3>El problema</h3>
          <p>{project.problem}</p>
          <h3>El enfoque</h3>
          <p>{project.approach}</p>
        </div>
        <div className="project-tags">
          {project.technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
        {(project.demoUrl || project.sourceUrl) && (
          <div className="actions">
            {project.demoUrl && (
              <ActionLink href={project.demoUrl} external>
                Ver demo <ArrowUpRight aria-hidden="true" />
              </ActionLink>
            )}
            {project.sourceUrl && (
              <ActionLink href={project.sourceUrl} variant="outline" external>
                Código <Code2 aria-hidden="true" />
              </ActionLink>
            )}
          </div>
        )}
        {project.isConcept && (
          <p className="project-disclaimer">
            Exploración visual de ejemplo; no representa un trabajo para un
            cliente.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Surface className="project-card">
      <ProjectCover project={project} priority={index === 0} />
      <div className="project-copy">
        <p className="eyebrow project-category">
          {String(index + 1).padStart(2, '0')} / {project.category}
        </p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        {project.collaboration && (
          <p className="project-collaboration">{project.collaboration}</p>
        )}
        <div className="project-tags">
          {project.technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
        {project.isConcept && (
          <p className="project-disclaimer">
            Concepto de interfaz · Proyecto de ejemplo
          </p>
        )}
      </div>
      <div className="actions project-card-actions">
        <ProjectDetails project={project} />
        {project.sourceUrl && (
          <ActionLink href={project.sourceUrl} external variant="ghost">
            Código <Code2 aria-hidden="true" />
          </ActionLink>
        )}
      </div>
    </Surface>
  );
}
export function ProjectCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);
  useEffect(() => {
    if (!api || projects.length < 2 || !autoplay || interactionPaused) return;
    const interval = window.setInterval(() => api.scrollNext(), 5000);
    return () => window.clearInterval(interval);
  }, [api, autoplay, interactionPaused]);
  const navigate = useCallback(
    (direction: 'previous' | 'next') => {
      setAutoplay(false);
      if (direction === 'previous') api?.scrollPrev(shouldJump());
      else api?.scrollNext(shouldJump());
    },
    [api],
  );
  const toggleAutoplay = useCallback(() => {
    setInteractionPaused(false);
    setAutoplay((current) => {
      if (!current) api?.scrollNext(shouldJump());
      return !current;
    });
  }, [api]);
  const handleWheel = useCarouselWheel(navigate);
  if (!projects.length)
    return (
      <Section
        id="proyectos"
        eyebrow="01 / Proyectos"
        title="Lo próximo está en construcción."
      >
        <p className="section-description">
          Pronto compartiré nuevos proyectos aquí.
        </p>
      </Section>
    );
  return (
    <Section
      id="proyectos"
      eyebrow="01 / Mis Proyectos"
      title="Una muestra de lo que he construido."
      description="Explora las experiencias digitales que he diseñado y que puedo realizar para ti."
      actions={
        projects.length > 1 && (
          <div className="carousel-arrows">
            <ActionButton
              className="action-icon"
              variant="outline"
              aria-label="Proyecto anterior"
              disabled={!api}
              onClick={() => navigate('previous')}
            >
              <ArrowLeft aria-hidden="true" />
            </ActionButton>
            <ActionButton
              className="action-icon"
              variant="outline"
              aria-label="Proyecto siguiente"
              disabled={!api}
              onClick={() => navigate('next')}
            >
              <ArrowRight aria-hidden="true" />
            </ActionButton>
            <ActionButton
              className="carousel-mobile-autoplay"
              variant="outline"
              aria-label={autoplay ? 'Pausar carrusel' : 'Reanudar carrusel'}
              aria-pressed={autoplay}
              disabled={!api}
              onClick={toggleAutoplay}
            >
              {autoplay ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
              {autoplay ? 'Pausar carrusel' : 'Reanudar carrusel'}
            </ActionButton>
          </div>
        )
      }
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        className="projects-carousel"
        aria-label="Proyectos seleccionados. Usa las flechas izquierda y derecha para navegar."
        aria-roledescription="carrusel"
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDownCapture={() => setAutoplay(false)}
        onMouseEnter={() => setInteractionPaused(true)}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={() => setInteractionPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setInteractionPaused(false);
          }
        }}
        onKeyDownCapture={(event) => {
          // Dialog portals bubble through React: never consume their keys.
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(event.key === 'ArrowLeft' ? 'previous' : 'next');
          }
        }}
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem
              key={project.id}
              aria-label={`${index + 1} de ${projects.length}: ${project.name}`}
              aria-roledescription="diapositiva"
              inert={index !== selected}
              aria-hidden={index !== selected}
            >
              <ProjectCard project={project} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {projects.length > 1 && (
        <div className="carousel-footer">
          <p className="carousel-counter" aria-live="polite" aria-atomic="true">
            {String(selected + 1).padStart(2, '0')}{' '}
            <span>
              / {String(projects.length).padStart(2, '0')} —{' '}
              {projects[selected].name}
            </span>
          </p>
          <fieldset className="carousel-pagination">
            <legend className="sr-only">Elegir proyecto</legend>
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Ver ${project.name}`}
                aria-pressed={index === selected}
                disabled={!api}
                onClick={() => {
                  setAutoplay(false);
                  api?.scrollTo(index, shouldJump());
                }}
              >
                <span />
              </button>
            ))}
          </fieldset>
          <div className="carousel-auxiliary">
            <span className="swipe-hint">
              Arrastra para explorar <ArrowRight size={14} aria-hidden="true" />
            </span>
            <ActionButton
              className="action-icon carousel-autoplay"
              variant="outline"
              aria-label={
                autoplay
                  ? 'Pausar avance automático de proyectos'
                  : 'Activar avance automático de proyectos'
              }
              aria-pressed={autoplay}
              disabled={!api}
              onClick={toggleAutoplay}
            >
              {autoplay ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
            </ActionButton>
          </div>
        </div>
      )}
    </Section>
  );
}
