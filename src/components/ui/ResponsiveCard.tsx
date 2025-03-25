
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

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
      },
      rounded: {
        default: "rounded-lg",
        md: "rounded-md",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
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
    return (
      <Card 
        ref={ref} 
        className={cn(cardVariants({ variant, rounded }), className)}
        {...props}
      >
        {(title || description) && (
          <CardHeader className={cn("flex flex-col space-y-1.5", headerClassName)}>
            {title && (
              <CardTitle className={cn("text-xl font-semibold", titleClassName)}>
                {isLoading ? (
                  <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  title
                )}
              </CardTitle>
            )}
            {description && (
              <CardDescription className={cn(descriptionClassName)}>
                {isLoading ? (
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
                ) : (
                  description
                )}
              </CardDescription>
            )}
          </CardHeader>
        )}
        
        <CardContent className={cn("pt-0", contentClassName)}>
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className={cn(innerClassName)}>{children}</div>
          )}
        </CardContent>
        
        {footer && (
          <CardFooter className={cn(footerClassName)}>
            {isLoading ? (
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
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
