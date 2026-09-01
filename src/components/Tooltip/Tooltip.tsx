import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Tooltip.module.css';

export interface TooltipProps extends Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'content'
> {
  /** The tooltip text. A tooltip with no content is not rendered. */
  content: ReactNode;
  /** The element the tooltip describes. Must be focusable to be reachable. */
  children: ReactNode;
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A tooltip *supplements* a control that already has an accessible name; it is
 * never the only label. For an icon-only button, give the button an `aria-label`
 * as well.
 */
export function Tooltip({
  content,
  children,
  delayDuration = 200,
  open,
  defaultOpen,
  onOpenChange,
  className,
  sideOffset = 6,
  ...props
}: TooltipProps) {
  if (!content) return <>{children}</>;

  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          {...props}
          sideOffset={sideOffset}
          className={cn(styles.content, className)}
        >
          {content}
          <TooltipPrimitive.Arrow className={styles.arrow} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

/** Wrap the app once. Radix shares hover timing across every Tooltip beneath it. */
export const TooltipProvider = TooltipPrimitive.Provider;
