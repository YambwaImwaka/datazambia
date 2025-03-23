
import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 w-max max-w-xs px-3 py-2 text-sm rounded shadow-md bg-black text-white dark:bg-white dark:text-black transition-opacity duration-300",
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
