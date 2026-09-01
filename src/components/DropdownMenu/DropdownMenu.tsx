import { DropdownMenu as MenuPrimitive } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './DropdownMenu.module.css';

export type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const Content = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function Content(
  { className, sideOffset = 6, ...props },
  ref,
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content, className)}
      />
    </MenuPrimitive.Portal>
  );
});

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  /** Styles the item as destructive. Does not change its behaviour. */
  destructive?: boolean;
  /**
   * Right-aligned hint text, e.g. a keyboard shortcut. Rendered decoratively:
   * glyphs like `⌘E` concatenate into the item's accessible name and are read
   * out as noise. To announce the binding, pass `aria-keyshortcuts` as well —
   * it needs ARIA's normalised format (`Meta+E`), which the glyph cannot supply.
   */
  shortcut?: ReactNode;
}

const Item = forwardRef<HTMLDivElement, DropdownMenuItemProps>(function Item(
  { destructive, shortcut, className, children, ...props },
  ref,
) {
  return (
    <MenuPrimitive.Item
      {...props}
      ref={ref}
      className={cn(styles.item, destructive && styles.destructive, className)}
    >
      {children}
      {shortcut ? (
        <span className={styles.shortcut} aria-hidden="true">
          {shortcut}
        </span>
      ) : null}
    </MenuPrimitive.Item>
  );
});

function MenuLabel({ className, ...props }: ComponentPropsWithoutRef<typeof MenuPrimitive.Label>) {
  return <MenuPrimitive.Label {...props} className={cn(styles.label, className)} />;
}

function MenuSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator {...props} className={cn(styles.separator, className)} />;
}

export const DropdownMenu = Object.assign(MenuPrimitive.Root, {
  Trigger: MenuPrimitive.Trigger,
  Content,
  Item,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Group: MenuPrimitive.Group,
});
