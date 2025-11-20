"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

interface CalendarProps {
  className?: string
  classNames?: {
    months?: string
    month?: string
    caption?: string
    caption_label?: string
    nav?: string
    nav_button?: string
    nav_button_previous?: string
    nav_button_next?: string
    table?: string
    head_row?: string
    head_cell?: string
    row?: string
    cell?: string
    day?: string
    day_range_middle?: string
    day_range_end?: string
    day_selected?: string
    day_today?: string
    day_outside?: string
    day_disabled?: string
    day_range_start?: string
    day_range_end?: string
    day_hidden?: string
    day_end_selected?: string
    day_start_selected?: string
    day_end_preview?: string
    day_start_preview?: string
    footer?: string
    interaction_box?: string
    day_picker?: string
  }
  showOutsideDays?: boolean
} & React.ComponentProps<typeof DayPicker>

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      classNames,
      showOutsideDays = true,
      ...props
    },
    ref
  ) => {
    return (
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={classNames}
        ref={ref}
        {...props}
      />
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }