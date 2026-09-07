import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './Skeleton.module.css';

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * A placeholder block shown while real content is loading. It carries no
 * accessible content of its own, so it is hidden from assistive tech by
 * default — the surrounding UI is responsible for announcing "loading".
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, ...props },
  ref,
) {
  return <div ref={ref} aria-hidden="true" className={cn(styles.root, className)} {...props} />;
});
