import { Dialog as DialogPrimitive } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CloseIcon } from '../../internal/icons';
import styles from './Dialog.module.css';

// `title` is omitted from the base props: the HTML `title` attribute is a string,
// and here it is the Dialog's heading.
export interface DialogContentProps extends Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  'title'
> {
  /** Required: a Dialog with no accessible name is unusable with a screen reader. */
  title: ReactNode;
  description?: ReactNode;
  /** Rendered right-aligned at the bottom — the action buttons. */
  footer?: ReactNode;
  showCloseButton?: boolean;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { title, description, footer, showCloseButton = true, className, children, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content {...props} ref={ref} className={cn(styles.content, className)}>
        <div className={styles.header}>
          <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className={styles.description}>
              {description}
            </DialogPrimitive.Description>
          ) : (
            // Radix warns when Content has no Description; opting out is explicit.
            <DialogPrimitive.Description asChild>
              <span hidden />
            </DialogPrimitive.Description>
          )}
        </div>
        {children}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
        {showCloseButton ? (
          <DialogPrimitive.Close className={styles.close} aria-label="Close">
            <CloseIcon />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = Object.assign(DialogPrimitive.Root, {
  Trigger: DialogPrimitive.Trigger,
  Content: DialogContent,
  Close: DialogPrimitive.Close,
});
