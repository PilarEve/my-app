import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-400 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
          variant === 'primary' && "bg-sand-700 text-white hover:bg-sand-800 shadow-sm",
          variant === 'secondary' && "bg-sand-200 text-sand-900 hover:bg-sand-300",
          variant === 'outline' && "border border-sand-300 bg-transparent hover:bg-sand-100 text-sand-800",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
