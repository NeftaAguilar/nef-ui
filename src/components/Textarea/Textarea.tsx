import { Label } from 'radix-ui';
import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useFieldIds } from '../../lib/useFieldIds';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /**
   * Shows a live character count against this limit. Deliberately does not
   * truncate — a composer that silently eats typing is worse than one that
   * shows you are over.
   */
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, maxLength, id: providedId, className, value, defaultValue, ...props },
  ref,
) {
  const { id, hintId, errorId, describedBy } = useFieldIds(
    providedId,
    Boolean(hint),
    Boolean(error),
  );
  const text = String(value ?? defaultValue ?? '');
  const over = maxLength !== undefined && text.length > maxLength;

  return (
    <div className={styles.wrapper}>
      <Label.Root className={styles.label} htmlFor={id}>
        {label}
      </Label.Root>
      <textarea
        {...props}
        ref={ref}
        id={id}
        value={value}
        defaultValue={defaultValue}
        className={cn(styles.textarea, className)}
        aria-invalid={error || over ? true : undefined}
        aria-describedby={describedBy}
        data-invalid={error || over ? '' : undefined}
      />
      <div className={styles.footer}>
        {error ? (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        ) : hint ? (
          <span id={hintId} className={styles.message}>
            {hint}
          </span>
        ) : (
          <span />
        )}
        {maxLength !== undefined ? (
          <span className={cn(styles.count, over && styles.countOver)} aria-live="polite">
            {text.length} / {maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
});
