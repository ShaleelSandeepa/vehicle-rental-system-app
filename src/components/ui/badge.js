import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'border-transparent bg-emerald-600 text-white hover:bg-emerald-700': variant === 'default',
          'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
          'border-transparent bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
          'text-gray-950': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };