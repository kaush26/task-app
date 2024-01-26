import { cn } from "@/lib/utils";
import Paper from "./ui/paper";

export default function ListItem({
  className = "",
  Icon,
  label,
  count,
  showCount = false,
  onClick,
}: {
  className?: string;
  Icon: React.ReactNode;
  label: React.ReactNode;
  count?: React.ReactNode;
  showCount?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn("flex items-center justify-between text-[14px] cursor-pointer select-none", className)}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {Icon}
        <div className="font-normal">{label}</div>
      </div>
      {showCount && <Paper className="bg-[#ebebeb] p-0 py-[1px] text-center w-[40px] rounded-lg font-medium">{count}</Paper>}
    </div>
  );
}
