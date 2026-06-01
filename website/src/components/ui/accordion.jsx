import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Компонент аккордеона (Accordion) на базе Radix UI.
 */
const Accordion = AccordionPrimitive.Root;

/**
 * Элемент аккордеона.
 */
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-3xl transition-all duration-300 overflow-hidden",
      "data-[state=open]:shadow-2xl data-[state=open]:shadow-main-theme/10",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-6 text-left transition-all duration-300 outline-none group",
          "hover:text-main-theme",
          className,
        )}
        {...props}
      >
        {children}
        <div className="size-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:bg-main-theme/10">
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-main-theme transition-colors" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-8 pt-0 leading-relaxed font-medium", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
