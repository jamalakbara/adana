"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
  "aria-label"?: string;
  id?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  align?: string;
  side?: string;
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface SelectValueProps {
  placeholder?: string | number;
  className?: string;
}

export function Select({ children, value, onValueChange, className = "" }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || "");

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            ...(child.props as Record<string, unknown>),
            isOpen,
            setIsOpen,
            value: internalValue,
            onValueChange: handleValueChange
          } as Record<string, unknown>);
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, className = "", size, "aria-label": ariaLabel, id }: SelectTriggerProps) {
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectContent({ children, className = "", align, side }: SelectContentProps) {
  return (
    <div className={`absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({ children, value, className = "", onClick }: SelectItemProps & { onClick?: () => void }) {
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder, className = "" }: SelectValueProps) {
  return (
    <span className={`block truncate ${className}`}>
      {placeholder?.toString()}
    </span>
  );
}