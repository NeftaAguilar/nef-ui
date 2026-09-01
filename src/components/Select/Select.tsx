import { Label, Select as SelectPrimitive } from 'radix-ui';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../../internal/icons';
import styles from './Select.module.css';

export interface SelectProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  label?: ReactNode;
  placeholder?: string;
  error?: ReactNode;
  /** Applied to the trigger, which is the element the user actually focuses. */
  triggerClassName?: string;
  children: ReactNode;
}

/**
 * A composed Select: the Root, trigger and content are wired together here, and
 * consumers supply `Select.Item` children. Radix's parts stay reachable for the
 * cases this shape does not cover.
 */
function SelectRoot({
  label,
  placeholder = 'Select…',
  error,
  triggerClassName,
  children,
  ...props
}: SelectProps) {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      {label ? (
        <Label.Root className={styles.label} htmlFor={id}>
          {label}
        </Label.Root>
      ) : null}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={id}
          className={cn(styles.trigger, triggerClassName)}
          aria-invalid={error ? true : undefined}
          data-invalid={error ? '' : undefined}
        >
          <SelectPrimitive.Value
            placeholder={<span className={styles.placeholder}>{placeholder}</span>}
          />
          <SelectPrimitive.Icon className={styles.icon}>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.content} position="popper" sideOffset={6}>
            <SelectPrimitive.ScrollUpButton className={styles.scrollButton}>
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className={styles.viewport}>
              {children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className={styles.scrollButton}>
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item {...props} ref={ref} className={cn(styles.item, className)}>
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

function SelectGroupLabel({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <SelectPrimitive.Label {...props} className={cn(styles.label_group, className)} />;
}

function SelectSeparator({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <SelectPrimitive.Separator {...props} className={cn(styles.separator, className)} />;
}

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
  Group: SelectPrimitive.Group,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
});
