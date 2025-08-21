import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, Check } from 'lucide-react';

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isOpen, setIsOpen, value, onValueChange })
          : child
      )}
    </div>
  );
};

const SelectTrigger = React.forwardRef(
  ({ className, children, isOpen, setIsOpen, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onClick={() => setIsOpen?.(!isOpen)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder, value, children }) => {
  return <span>{value || placeholder}</span>;
};

const SelectContent = React.forwardRef(
  ({ className, children, isOpen, setIsOpen, value, onValueChange, ...props }, ref) => {
    const contentRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (contentRef.current && !contentRef.current.contains(event.target)) {
          setIsOpen?.(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={contentRef}
        className={cn(
          'absolute z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-950 shadow-md',
          className
        )}
        {...props}
      >
        <div className="p-1">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { value, onValueChange, setIsOpen })
              : child
          )}
        </div>
      </div>
    );
  }
);
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef(
  ({ className, children, value: itemValue, onValueChange, setIsOpen, ...props }, ref) => {
    const handleClick = () => {
      onValueChange?.(itemValue);
      setIsOpen?.(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
        {children}
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };