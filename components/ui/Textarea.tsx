// carbon-neutral/components/ui/Textarea.tsx
import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border rounded px-3 py-2 text-sm ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
