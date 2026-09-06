import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './HStack.module.css';

export type HStackProps = HTMLAttributes<HTMLDivElement>;

/**
 * A `display: flex` row and nothing else — no gap, alignment, padding or margin
 * props. Those are layout decisions that vary per usage, so they belong in the
 * consumer's own `className` or `style`, not baked into the Recipe.
 */
export const HStack = forwardRef<HTMLDivElement, HStackProps>(function HStack(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn(styles.root, className)} {...props} />;
});
