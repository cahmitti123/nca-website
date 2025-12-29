"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatYmd(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function parseYmd(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return undefined
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function formatDisplayDate(date: Date, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date)
}

export type DatePickerProps = {
  /**
   * Optional form field name. When set, the picker will write the value as
   * `YYYY-MM-DD` into a hidden input for standard `<form>` submissions.
   */
  name?: string
  id?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  locale?: string
  className?: string
  buttonClassName?: string
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect">
  onValueChange?: (value: string) => void
}

export function DatePicker({
  name,
  id,
  defaultValue,
  placeholder = "Choisir une date",
  disabled = false,
  locale = "fr-FR",
  className,
  buttonClassName,
  calendarProps,
  onValueChange,
}: DatePickerProps) {
  const initial = defaultValue ? parseYmd(defaultValue) : undefined
  const [date, setDate] = React.useState<Date | undefined>(initial)

  React.useEffect(() => {
    if (!defaultValue) return
    setDate(parseYmd(defaultValue))
  }, [defaultValue])

  const value = date ? formatYmd(date) : ""

  return (
    <div className={cn("w-full", className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            data-empty={!date}
            className={cn(
              "data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal",
              buttonClassName
            )}
          >
            <CalendarIcon className="mr-2 size-4" aria-hidden="true" />
            {date ? formatDisplayDate(date, locale) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next)
              onValueChange?.(next ? formatYmd(next) : "")
            }}
            initialFocus
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}




