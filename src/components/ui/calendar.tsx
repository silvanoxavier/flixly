"use client"

import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { type ComponentProps } from "react"

type CalendarProps = ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={classNames}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }