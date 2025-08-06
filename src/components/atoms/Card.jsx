import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
ref={ref}
      className={cn(
        "rounded-2xl backdrop-filter backdrop-blur-lg bg-white/20 shadow-xl border border-white/30 transition-all duration-300 hover:bg-white/25 hover:shadow-2xl hover:border-white/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;