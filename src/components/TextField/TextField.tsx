import { Label } from 'radix-ui';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useFieldIds } from '../../lib/useFieldIds';
import styles from './TextField.module.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: ReactNode;
  /** Guidance shown under the control. Hidden while an error is showing. */
  hint?: ReactNode;
  /** Presence of an error puts the control in its invalid state. */
  error?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, id: providedId, className, ...props },
  ref,
) {
  const { id, hintId, errorId, describedBy } = useFieldIds(
    providedId,
    Boolean(hint),
    Boolean(error),
  );

  return (
    <div className={styles.wrapper}>
      <Label.Root className={styles.label} htmlFor={id}>
        {label}
      </Label.Root>
      <input
        {...props}
        ref={ref}
        id={id}
        className={cn(styles.input, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        data-invalid={error ? '' : undefined}
      />
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className={styles.message}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});
