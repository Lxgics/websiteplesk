
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-rocket-600 text-white hover:bg-rocket-700 shadow-sm hover:shadow",
    secondary: "bg-space-800 text-white hover:bg-space-700 shadow-sm hover:shadow",
    outline: "bg-transparent border border-space-200 dark:border-space-700 hover:bg-space-50 dark:hover:bg-space-800",
    ghost: "bg-transparent hover:bg-space-50 dark:hover:bg-space-800",
    link: "bg-transparent underline-offset-4 hover:underline text-rocket-600 dark:text-rocket-400 p-0 h-auto min-h-0",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 h-8 min-h-8",
    md: "text-sm px-4 h-10 min-h-10",
    lg: "text-base px-6 h-12 min-h-12"
  };

  const fullWidthStyle = fullWidth ? "w-full" : "";
  
  // Skip size styles for link variant
  const appliedSizeStyles = variant === 'link' ? '' : sizeStyles[size];

  const buttonStyles = cn(
    baseStyles,
    variantStyles[variant],
    appliedSizeStyles,
    fullWidthStyle,
    "group",
    className
  );
  
  const iconWrapperStyles = "inline-flex items-center justify-center transition-transform duration-300";
  const leftIconStyles = cn(iconWrapperStyles, "mr-2 group-hover:-translate-x-0.5");
  const rightIconStyles = cn(iconWrapperStyles, "ml-2 group-hover:translate-x-0.5");

  return (
    <button className={buttonStyles} {...props}>
      {icon && iconPosition === 'left' && <span className={leftIconStyles}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={rightIconStyles}>{icon}</span>}
      
      {/* Hover effect overlay */}
      {variant !== 'link' && (
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]"></span>
        </span>
      )}
    </button>
  );
};

export default AnimatedButton;
