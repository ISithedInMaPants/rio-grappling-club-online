import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00923f]';

  const variantClasses = {
    primary:
      'bg-[#00923f] hover:bg-[#007a34] text-white shadow-sm hover:shadow-[0_0_15px_rgba(0,146,63,0.3)] active:translate-y-px',
    secondary:
      'bg-[#161619] hover:bg-[#212126] text-[#ededf4] border border-[#2b2b32] hover:border-[#454552] active:translate-y-px',
    outline:
      'bg-transparent hover:bg-[#161619] text-[#ededf4] border border-[#2b2b32] hover:border-[#454552]',
    ghost:
      'bg-transparent hover:bg-[#212126] text-[#9a9aa6] hover:text-[#ededf4]',
    gold:
      'bg-[#e0b252] hover:bg-[#c99e44] text-[#0d0d0e] font-semibold shadow-sm hover:shadow-[0_0_15px_rgba(224,178,82,0.3)]',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    icon: 'p-2 w-9 h-9',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
