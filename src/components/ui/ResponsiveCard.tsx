
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { useIsMobile } from '@/hooks/use-mobile';

const cardVariants = cva(
  "transition-all duration-200 h-full",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        ghost: "bg-transparent border-none shadow-none",
        outline: "bg-transparent border border-gray-200 dark:border-gray-700",
        elevated: "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg",
        interactive: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md cursor-pointer",
        glass: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50",
        compact: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-0",
      },
      rounded: {
        default: "rounded-lg",
        md: "rounded-md",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl",
        none: "rounded-none",
        responsive: "rounded-md md:rounded-lg",
      },
      padding: {
        default: "",
        sm: "p-2",
        md: "p-3 md:p-4",
        lg: "p-4 md:p-6",
        none: "p-0",
        responsive: "p-3 sm:p-4 md:p-5 lg:p-6",
      }
    },
    defaultVariants: {
      variant: "default",
      rounded: "responsive",
      padding: "responsive",
    }
  }
);

export interface ResponsiveCardProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  innerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  isLoading?: boolean;
}

const ResponsiveCard = React.forwardRef<HTMLDivElement, ResponsiveCardProps>(
  ({
    className,
    variant,
    rounded,
    padding,
    title,
    description,
    footer,
    children,
    innerClassName,
    headerClassName,
    contentClassName,
    footerClassName,
    titleClassName,
    descriptionClassName,
    isLoading = false,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    
    return (
      <Card 
        ref={ref} 
        className={cn(cardVariants({ variant, rounded, padding }), className)}
        {...props}
      >
        {(title || description) && (
          <CardHeader className={cn("flex flex-col space-y-1 p-3 sm:p-4", headerClassName)}>
            {title && (
              <CardTitle className={cn(
                "font-semibold", 
                isMobile ? "text-base" : "text-lg md:text-xl", 
                titleClassName
              )}>
                {isLoading ? (
                  <div className="h-5 sm:h-6 md:h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  title
                )}
              </CardTitle>
            )}
            {description && (
              <CardDescription className={cn(isMobile ? "text-xs" : "text-sm", descriptionClassName)}>
                {isLoading ? (
                  <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1 sm:mt-2"></div>
                ) : (
                  description
                )}
              </CardDescription>
            )}
          </CardHeader>
        )}
        
        <CardContent className={cn("pt-0 p-3 sm:p-4", contentClassName)}>
          {isLoading ? (
            <div className="space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 sm:h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 sm:h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className={cn(innerClassName)}>{children}</div>
          )}
        </CardContent>
        
        {footer && (
          <CardFooter className={cn("p-3 sm:p-4", footerClassName)}>
            {isLoading ? (
              <div className="h-8 sm:h-9 md:h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              footer
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);

ResponsiveCard.displayName = "ResponsiveCard";

export { ResponsiveCard };
