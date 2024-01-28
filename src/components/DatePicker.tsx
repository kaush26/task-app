import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerTypes = {
  className?: string;
  date?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker({ className, date, onChange, ...props }: DatePickerTypes & CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  function handleSelect(value: Date | undefined) {
    setSelectedDate(value);
    onChange?.(value);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar {...props} mode="single" selected={selectedDate} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
