import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "font-syne min-h-[80px] w-full min-w-0 rounded-[16px] border border-paper-dark bg-white px-[24px] py-[16px] text-[32px] font-medium tracking-[-1.2px] transition-colors outline-none placeholder:text-[#c6c6c6] focus-visible:border-paper-dark focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props} />
  );
}

export { Input }