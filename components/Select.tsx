
import React from 'react';

interface SelectProps<T extends string | number> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: T; label: string }>;
  containerClassName?: string;
}

export const Select = <T extends string | number,>({ label, id, options, containerClassName = '', className = '', ...props }: SelectProps<T>): React.ReactElement => {
  return (
    <div className={`${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select
        id={id}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
