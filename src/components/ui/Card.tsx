import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = '',
  headerAction,
  noPadding = false
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      rounded-lg shadow-sm 
      overflow-hidden
      transition-all duration-200
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="flex justify-between items-start p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            {title && <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      <div className={`${noPadding ? '' : 'p-4'}`}>
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;