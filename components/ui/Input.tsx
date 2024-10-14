// carbon-neutral/components/ui/Input.tsx
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded px-3 py-2 text-sm ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
