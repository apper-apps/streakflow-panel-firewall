import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
<label className="block text-sm font-medium text-white mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
          {label}
        </label>
      )}
      <input
type={type}
        className={cn(
          "flex w-full rounded-lg backdrop-filter backdrop-blur-lg bg-white/25 border border-white/40 px-3 py-2 text-sm text-white placeholder:text-white/80 transition-all duration-200 focus:bg-white/30 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400/70 focus:border-red-400 focus:ring-red-400/30",
          className
        )}
        ref={ref}
        {...props}
      />
{error && (
<p className="text-sm text-red-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;