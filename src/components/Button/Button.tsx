import { Slot } from 'radix-ui';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = '1' | '2' | '3';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the child element instead of a `<button>`, keeping the styling. */
  asChild?: boolean;
  /**
   * Shows a spinner and blocks interaction. The label is dimmed rather than
   * removed, so the button keeps both its width and its accessible name.
   * With `asChild` the label is not dimmed — the slotted element owns its content.
   */
  loading?: boolean;
  children?: ReactNode;
}

const sizeClass: Record<ButtonSize, string | undefined> = {
  '1': styles.size1,
  '2': styles.size2,
  '3': styles.size3,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    size = '2',
    asChild = false,
    loading = false,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const shared = {
    ref,
    className: cn(styles.root, styles[variant], sizeClass[size], className),
    'data-loading': loading || undefined,
    'aria-busy': loading || undefined,
    ...props,
  };

  const spinner = loading ? <span className={styles.spinner} aria-hidden="true" /> : null;

  // Slot requires exactly one element child, so the spinner sits beside a
  // Slottable rather than inside a label wrapper.
  if (asChild) {
    return (
      <Slot.Root {...shared} aria-disabled={disabled || loading || undefined}>
        {spinner}
        <Slot.Slottable>{children}</Slot.Slottable>
      </Slot.Root>
    );
  }

  return (
    <button {...shared} disabled={disabled || loading}>
      {spinner}
      <span className={styles.label}>{children}</span>
    </button>
  );
});
