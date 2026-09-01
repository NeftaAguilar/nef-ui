import { Switch as SwitchPrimitive } from 'radix-ui';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Switch.module.css';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Rendered beside the control and wired to it, so the text is clickable too. */
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, id: providedId, className, ...props },
  ref,
) {
  const generated = useId();
  const id = providedId ?? generated;

  const control = (
    <SwitchPrimitive.Root {...props} ref={ref} id={id} className={cn(styles.root, className)}>
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );

  if (!label) return control;

  return (
    <span className={styles.wrapper}>
      {control}
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </span>
  );
});
