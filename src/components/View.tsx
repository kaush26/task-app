import Paper from "@/components/ui/paper";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";
import React from "react";

type ViewTypes = {
  children: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

export default function View({ className, children, label, onClose }: ViewTypes) {
  return (
    <Paper className={cn("flex flex-col w-[34dvw] h-[calc(100dvh-46px)]", className)}>
      <header className="flex items-center justify-between text-[20px] font-semibold">
        <div className="">{label}</div>
        <LuX className="cursor-pointer" onClick={onClose} />
      </header>
      {children}
    </Paper>
  );
}
