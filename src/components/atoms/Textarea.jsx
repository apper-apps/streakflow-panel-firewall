import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
{label && (
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow">
          {label}
        </label>
      )}
<textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg backdrop-filter backdrop-blur-lg bg-white/20 border border-white/30 px-3 py-2 text-sm text-white placeholder:text-white/60 transition-all duration-200 focus:bg-white/25 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          error && "border-red-400/60 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        ref={ref}
        {...props}
      />
{error && (
        <p className="text-sm text-red-200 drop-shadow">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;