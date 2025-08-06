import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children,
  ...props 
}, ref) => {
const variants = {
    primary: "backdrop-filter backdrop-blur-lg bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl border border-white/30 hover:border-white/40",
    secondary: "backdrop-filter backdrop-blur-lg bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 shadow-lg hover:shadow-xl",
    success: "backdrop-filter backdrop-blur-lg bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-500 hover:to-green-500 text-white shadow-xl hover:shadow-2xl border border-white/30 hover:border-white/40",
    accent: "backdrop-filter backdrop-blur-lg bg-gradient-to-r from-amber-500/80 to-orange-500/80 hover:from-amber-500 hover:to-orange-500 text-white shadow-xl hover:shadow-2xl border border-white/30 hover:border-white/40",
    ghost: "backdrop-filter backdrop-blur-sm bg-transparent hover:bg-white/20 text-white/80 hover:text-white border border-transparent hover:border-white/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
    icon: "p-2 rounded-lg"
  };

  return (
    <button
className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;