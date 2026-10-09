
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export default function Input({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ">
          {leftIcon}
        </span>
      )}

      <input
        {...props}
        className={`h-10 w-full rounded-medium border border-border bg-input px-3 text-small text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 ${
          leftIcon ? "pl-10" : ""
        } ${rightIcon ? "pr-10" : ""} ${className}`}
      />

      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
