import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isOpen, setIsOpen })
          : child
      )}
    </div>
  );
};

const DropdownMenuTrigger = React.forwardRef(
  ({ className, children, asChild, isOpen, setIsOpen, ...props }, ref) => {
    const handleClick = () => {
      setIsOpen?.(!isOpen);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: handleClick,
        className: cn(className, children.props.className),
      });
    }

    return (
      <button
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef(
  ({ className, align = 'start', isOpen, setIsOpen, children, ...props }, ref) => {
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
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md',
          align === 'end' ? 'right-0' : 'left-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef(({ className, asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      className: cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
        children.props.className
      ),
    });
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };