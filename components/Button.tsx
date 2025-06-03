
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon' | 'outline';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, size = 'md', ...props }) => {
  let baseStyle = "inline-flex items-center justify-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  baseStyle += ` ${sizeStyles[size]}`;

  if (variant === 'primary') {
    baseStyle += " text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  } else if (variant === 'secondary') {
    baseStyle += " text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500";
  } else if (variant === 'danger') {
    baseStyle += " text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
  } else if (variant === 'icon') {
    baseStyle = `p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 ${sizeStyles[size]}`; // Icon specific padding
     if (size === 'sm') baseStyle = `p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500`;
     else if (size === 'md') baseStyle = `p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500`;
     else if (size === 'lg') baseStyle = `p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500`;
  } else if (variant === 'outline') {
    baseStyle += " text-indigo-600 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500";
  }


  return (
    <button
      type="button"
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
