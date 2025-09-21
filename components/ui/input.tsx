import { cn } from '~/lib/utils/cn'

import type * as React from 'react'

interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'form'
}

function Input({ className, type, variant = 'default', ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        'flex w-full min-w-0 rounded-md px-3 py-1 text-base outline-none transition-all duration-200 selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        // Variant-specific styles
        variant === 'default' && [
          'h-9 border border-input bg-transparent shadow-xs',
          'md:text-sm dark:bg-input/30',
        ],

        variant === 'form' && [
          'h-11 border-2 border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm',
          'text-gray-900 md:text-base',
          'hover:border-gray-300 hover:bg-white',
          'placeholder:text-gray-500',
        ],

        // Focus states
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        variant === 'form' &&
          'focus-visible:border-blue-400 focus-visible:bg-white focus-visible:ring-blue-400/20',

        // Error states
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

        className
      )}
      {...props}
    />
  )
}

export { Input }
