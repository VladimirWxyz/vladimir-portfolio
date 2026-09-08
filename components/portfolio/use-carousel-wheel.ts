'use client';

import { useCallback, useEffect, useRef, type WheelEvent } from 'react';

type Direction = 'previous' | 'next';

const GESTURE_THRESHOLD = 36;
const GESTURE_END_DELAY = 180;

export function useCarouselWheel(navigate: (direction: Direction) => void) {
  const accumulatedDelta = useRef(0);
  const gestureHandled = useRef(false);
  const gestureEndTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (gestureEndTimer.current) window.clearTimeout(gestureEndTimer.current);
    },
    [],
  );

  return useCallback(
    (event: WheelEvent<HTMLElement>) => {
      // React portals preserve event bubbling. Ignore gestures whose DOM target
      // lives outside this carousel, such as the gallery inside a dialog.
      if (!event.currentTarget.contains(event.target as Node)) return;
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      event.preventDefault();
      if (gestureEndTimer.current) window.clearTimeout(gestureEndTimer.current);
      gestureEndTimer.current = window.setTimeout(() => {
        accumulatedDelta.current = 0;
        gestureHandled.current = false;
      }, GESTURE_END_DELAY);

      if (gestureHandled.current) return;
      const multiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1;
      accumulatedDelta.current += event.deltaX * multiplier;

      if (Math.abs(accumulatedDelta.current) < GESTURE_THRESHOLD) return;
      gestureHandled.current = true;
      navigate(accumulatedDelta.current > 0 ? 'next' : 'previous');
    },
    [navigate],
  );
}
