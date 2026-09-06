import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './VStack.module.css';

export type VStackProps = HTMLAttributes<HTMLDivElement>;

/**
 * A `display: flex` column and nothing else — no gap, alignment, padding or
 * margin props. Those are layout decisions that vary per usage, so they belong
 * in the consumer's own `className` or `style`, not baked into the Recipe.
 */
export const VStack = forwardRef<HTMLDivElement, VStackProps>(function VStack(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn(styles.root, className)} {...props} />;
});
