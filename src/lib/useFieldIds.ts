import { useId } from 'react';

/**
 * The wiring every labelled control needs: stable ids for the control, its
 * description and its error, plus the `aria-describedby` that ties them
 * together. Shared so TextField and Textarea cannot drift apart.
 */
export function useFieldIds(providedId: string | undefined, hasHint: boolean, hasError: boolean) {
  const generated = useId();
  const id = providedId ?? generated;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [hasError ? errorId : null, hasHint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return { id, hintId, errorId, describedBy };
}
