import type { ChangeEventHandler } from "react";

import { format, setHours, setMinutes } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ButtonGroup } from "../ui/button-group";

function DateTimePicker({
  value,
  className,
  onChange,
  disabled,
}: {
  value?: string | Date;
  className?: string;
  onChange?: (date: Date) => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [timeValue, setTimeValue] = useState<string>(value ? format(new Date(value), "HH:mm") : "00:00");

  // Keep the time input in sync when the selected date changes elsewhere.
  useEffect(() => {
    if (selected) {
      setTimeValue(format(selected, "HH:mm"));
    }
  }, [selected]);

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      // Defer composing a full Date until a day is picked.
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map(str => Number.parseInt(str, 10));
    // Compose a new Date using the current day plus the chosen time.
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    onChange?.(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map(str => Number.parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelected(newDate);
    onChange?.(newDate);
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="space-y-2">

        <ButtonGroup className="w-full">
          <Popover>
            <PopoverTrigger asChild className="w-full">
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-2/3 justify-start text-left font-normal",
                  !selected && "text-muted-foreground",
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selected ? format(selected, "LLL dd, y HH:mm") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={handleDaySelect}
                defaultMonth={selected}
                className={cn(
                  "bg-background group/calendar p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
                  String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
                  String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
                )}
              />
            </PopoverContent>
          </Popover>
          <Input
            id="time-input"
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="w-32"
            disabled={disabled}
            onClick={e => e.stopPropagation()}
          />
        </ButtonGroup>
      </div>

      {/* {selected && (
                <div className="text-sm text-muted-foreground">
                    Selected: {selected.toLocaleString()}
                </div>
            )} */}
    </div>
  );
}

export default DateTimePicker;
