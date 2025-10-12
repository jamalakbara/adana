import React from "react";

interface AdminSelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: AdminSelectOption[];
  placeholder?: string;
}

export function AdminSelect({
  label,
  error,
  helperText,
  options,
  placeholder = "Select an option",
  className = "",
  id,
  ...props
}: AdminSelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={`block w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed touch-manipulation appearance-none bg-white sm:py-2 sm:px-3 sm:text-sm sm:rounded-md sm:focus:ring-1 sm:focus:ring-blue-500 sm:bg-white ${
          error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}