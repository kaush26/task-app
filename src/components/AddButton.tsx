import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { LuPlus } from "react-icons/lu";

export default function AddButton({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & ButtonProps) {
  return (
    <Button variant={"outline"} {...props} className={cn("w-full p-[26px]", className)}>
      <div className="flex items-center gap-[16px] w-full">
        <LuPlus />
        {children}
      </div>
    </Button>
  );
}
