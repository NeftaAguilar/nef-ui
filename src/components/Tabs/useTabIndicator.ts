import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures the active tab trigger and publishes its position and width as CSS
 * custom properties on the list. Keeping the *animation* in CSS and only the
 * *measurement* in JS is what lets the library stay free of a runtime animation
 * dependency (ADR-0003).
 */
export function useTabIndicator(value: string | undefined) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-state="active"]');
      if (!active) {
        setReady(false);
        return;
      }
      list.style.setProperty('--nef-tab-indicator-left', `${active.offsetLeft}px`);
      list.style.setProperty('--nef-tab-indicator-width', `${active.offsetWidth}px`);
      setReady(true);
    };

    measure();

    // Triggers move when the container resizes or a label's font finishes loading.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const child of list.children) observer.observe(child);

    return () => observer.disconnect();
  }, [value]);

  return { listRef, ready };
}
