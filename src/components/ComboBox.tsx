import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ItemType = {
  label: string;
  value: string;
};

type ComboboxPropTypes = {
  className?: string;
  open?: boolean;
  placeholder?: React.ReactNode;
  filterPlaceholder?: string;
  container?: HTMLElement;
  items: ItemType[];
  selected?: ItemType | null;
  onSelectItem?: (item: ItemType | null) => void;
};

export default function Combobox(props: ComboboxPropTypes & React.HTMLAttributes<HTMLDivElement>) {
  const {
    className = "",
    container,
    placeholder = "Select items...",
    filterPlaceholder = "Search items...",
    items = [],
    onSelectItem,
  } = props;
  const [open, setOpen] = React.useState(props.open ?? false);
  const [selectedItem, setSelectedItem] = React.useState(props.selected ?? null);
  React.useEffect(() => {
    setSelectedItem(props.selected ?? null);
  }, [props.selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-[200px] justify-between", className)}>
          {selectedItem ? selectedItem.label : <div className="text-[#707070]">{placeholder}</div>}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" container={container}>
        <Command>
          <CommandInput placeholder={filterPlaceholder} className="h-9" />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  const value = items.find((priority) => priority.value === currentValue) ?? null;
                  setSelectedItem(value);
                  setOpen(false);
                  onSelectItem?.(value);
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn("ml-auto h-4 w-4", selectedItem?.value === item.value ? "opacity-100" : "opacity-0")}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
