import { Tabs as TabsPrimitive } from 'radix-ui';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type Ref,
} from 'react';
import { cn } from '../../lib/cn';
import styles from './Tabs.module.css';
import { useTabIndicator } from './useTabIndicator';

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: T | null }).current = node;
}

/** Lets the List observe the selected value without the consumer wiring it up. */
const ValueContext = createContext<string | undefined>(undefined);

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

function TabsRoot({ value, defaultValue, onValueChange, ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;

  return (
    <ValueContext.Provider value={current}>
      <TabsPrimitive.Root
        {...props}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          setInternal(next);
          onValueChange?.(next);
        }}
      />
    </ValueContext.Provider>
  );
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, ...props },
  ref,
) {
  const value = useContext(ValueContext);
  const { listRef, ready } = useTabIndicator(value);

  // The indicator needs the node to measure it, and the consumer may want it
  // too, so both refs are fed from one callback.
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      assignRef(ref, node);
    },
    [listRef, ref],
  );

  return (
    <TabsPrimitive.List {...props} ref={setRefs} className={cn(styles.list, className)}>
      {children}
      <span className={styles.indicator} data-ready={ready} aria-hidden="true" />
    </TabsPrimitive.List>
  );
});

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, ...props },
  ref,
) {
  return <TabsPrimitive.Trigger {...props} ref={ref} className={cn(styles.trigger, className)} />;
});

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, ...props },
  ref,
) {
  return <TabsPrimitive.Content {...props} ref={ref} className={cn(styles.content, className)} />;
});

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
