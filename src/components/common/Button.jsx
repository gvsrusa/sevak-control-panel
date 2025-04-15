import React from 'react';

const Button = ({ children, onClick, className, disabled, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center rounded-md 
        transition-colors duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2'}
      `}
    >
      {children}
    </button>
  );
};

export default Button;