import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input {...props}
      className={`w-full h-10 px-3 rounded-[var(--radius-medium)] border border-border bg-white text-small text-foreground outline-none  transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10
        ${className} `}
    />
  );
}