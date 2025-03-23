
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  children: React.ReactNode;
  content: React.ReactNode;
}

export declare const Tooltip: React.FC<TooltipProps>;
export declare const TooltipProvider: typeof TooltipPrimitive.Provider;
export declare const TooltipRoot: typeof TooltipPrimitive.Root;
export declare const TooltipTrigger: typeof TooltipPrimitive.Trigger;
export declare const TooltipContent: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
  React.RefAttributes<React.ElementRef<typeof TooltipPrimitive.Content>>
>;
