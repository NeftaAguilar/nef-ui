import { Toast as ToastPrimitive } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Toast.module.css';

export type ToastTone = 'neutral' | 'success' | 'danger';

// `title` is omitted for the same reason as Dialog: it is a heading, not the
// HTML `title` attribute.
export interface ToastProps extends Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
  'title'
> {
  title: ReactNode;
  description?: ReactNode;
  /**
   * A single action. Radix requires an `altText` so keyboard and screen-reader
   * users get an equivalent route to the same action.
   */
  action?: { label: ReactNode; altText: string; onClick?: () => void };
  tone?: ToastTone;
}

const toneClass: Record<ToastTone, string | undefined> = {
  neutral: undefined,
  success: styles.success,
  danger: styles.danger,
};

const ToastRoot = forwardRef<HTMLLIElement, ToastProps>(function Toast(
  { title, description, action, tone = 'neutral', className, ...props },
  ref,
) {
  return (
    <ToastPrimitive.Root
      {...props}
      ref={ref}
      className={cn(styles.root, toneClass[tone], className)}
    >
      <ToastPrimitive.Title className={styles.title}>{title}</ToastPrimitive.Title>
      {description ? (
        <ToastPrimitive.Description className={styles.description}>
          {description}
        </ToastPrimitive.Description>
      ) : null}
      {action ? (
        <ToastPrimitive.Action className={styles.action} altText={action.altText} asChild>
          <button type="button" onClick={action.onClick}>
            {action.label}
          </button>
        </ToastPrimitive.Action>
      ) : null}
    </ToastPrimitive.Root>
  );
});

function ToastViewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) {
  return <ToastPrimitive.Viewport {...props} className={cn(styles.viewport, className)} />;
}

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastPrimitive.Provider,
  Viewport: ToastViewport,
  Close: ToastPrimitive.Close,
});
