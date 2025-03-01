import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DropdownProps {
  options: string[];
  defaultOption?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = (
  { options, defaultOption = "Select an option", className, onChange },
  ...props
) => {
  return (
    <Select onValueChange={onChange} {...props} defaultValue={defaultOption}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
