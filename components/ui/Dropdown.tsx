import * as React from "react";

interface DropdownProps {
  options: string[];
  defaultOption?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, defaultOption = "Select an option", className }) => {
  return (
    <select className={className}>
      <option>{defaultOption}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};