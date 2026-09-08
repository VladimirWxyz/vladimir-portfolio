'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { ProjectImage } from '@/data/portfolio';
import { ActionButton } from './action-button';
import { useCarouselWheel } from './use-carousel-wheel';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionPreference() {
  return true;
}

interface ProjectGalleryProps {
  readonly images: readonly ProjectImage[];
  readonly projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const hasMultipleImages = images.length > 1;

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
    if (
      !api ||
      !hasMultipleImages ||
      !autoplay ||
      hovered ||
      focused ||
      reducedMotion
    )
      return;
    const interval = window.setInterval(() => api.scrollNext(), 6500);
    return () => window.clearInterval(interval);
  }, [api, autoplay, focused, hasMultipleImages, hovered, reducedMotion]);

  const navigate = useCallback(
    (direction: 'previous' | 'next') => {
      setAutoplay(false);
      if (direction === 'previous') api?.scrollPrev(reducedMotion);
      else api?.scrollNext(reducedMotion);
    },
    [api, reducedMotion],
  );
  const handleWheel = useCarouselWheel(navigate);

  if (!images.length) return null;

  return (
    <div
      className="project-gallery"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        className="gallery-carousel"
        aria-label={`Recorrido visual de ${projectName}`}
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDownCapture={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(event.key === 'ArrowLeft' ? 'previous' : 'next');
          }
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={image.src}
              aria-label={`${index + 1} de ${images.length}: ${image.caption}`}
              aria-roledescription="diapositiva"
              inert={index !== selected}
              aria-hidden={index !== selected}
            >
              <figure className="gallery-stage">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 900}
                  height={image.height ?? 1252}
                  sizes="(max-width: 720px) calc(100vw - 4rem), 760px"
                  priority={index === 0}
                />
                <figcaption>{image.caption}</figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {hasMultipleImages && (
        <div className="gallery-footer">
          <p className="gallery-counter" aria-live="polite" aria-atomic="true">
            {String(selected + 1).padStart(2, '0')}
            <span> / {String(images.length).padStart(2, '0')}</span>
          </p>
          <fieldset className="gallery-pagination">
            <legend className="sr-only">Elegir imagen</legend>
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Ver ${image.caption}`}
                aria-pressed={index === selected}
                disabled={!api}
                onClick={() => {
                  setAutoplay(false);
                  api?.scrollTo(index, reducedMotion);
                }}
              >
                <span />
              </button>
            ))}
          </fieldset>
          <div className="gallery-controls">
            <ActionButton
              className="action-icon"
              variant="outline"
              aria-label="Imagen anterior"
              disabled={!api}
              onClick={() => navigate('previous')}
            >
              <ArrowLeft aria-hidden="true" />
            </ActionButton>
            <ActionButton
              className="action-icon"
              variant="outline"
              aria-label={
                reducedMotion
                  ? 'Avance automático desactivado por preferencia de movimiento'
                  : autoplay
                    ? 'Pausar avance automático'
                    : 'Activar avance automático'
              }
              aria-pressed={!reducedMotion && autoplay}
              disabled={reducedMotion}
              onClick={() => setAutoplay((current) => !current)}
            >
              {autoplay ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
            </ActionButton>
            <ActionButton
              className="action-icon"
              variant="outline"
              aria-label="Imagen siguiente"
              disabled={!api}
              onClick={() => navigate('next')}
            >
              <ArrowRight aria-hidden="true" />
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
