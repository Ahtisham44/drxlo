import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({ className, children, value, ...props }) {
  const selectRef = React.useRef(null)
  const mirrorRef = React.useRef(null)
  const [textWidth, setTextWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    const mirror = mirrorRef.current
    if (mirror && selectRef.current?.options) {
      const option =
        selectRef.current.options[selectRef.current.selectedIndex] ?? selectRef.current.options[0]
      mirror.textContent = option?.label ?? ""
      setTextWidth(mirror.getBoundingClientRect().width)
    }
  }, [value, children])

  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <select
        ref={selectRef}
        data-slot="select"
        style={textWidth ? { width: `${textWidth}px` } : undefined}
        className="peer min-w-0 cursor-pointer appearance-none bg-transparent font-syne font-extrabold tracking-[-3px] outline-none underline decoration-[2px] underline-offset-[6px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        {children}
      </select>
      <span
        ref={mirrorRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute whitespace-nowrap font-syne font-extrabold tracking-[-3px]"
      >
        {value}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none size-[0.7em] shrink-0 text-current"
        strokeWidth={4}
      />
    </span>
  )
}

export { Select }