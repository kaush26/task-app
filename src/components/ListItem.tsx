import { cn } from "@/lib/utils";
import Paper from "./ui/paper";

export type ListItemPropsType = {
  className?: string;
  Icon: React.ReactNode;
  label: React.ReactNode;
  count?: React.ReactNode;
  showCount?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export default function ListItem({
  className = "",
  Icon,
  label,
  count,
  showCount = false,
  onClick,
  active = false,
}: ListItemPropsType) {
  return (
    <div
      style={{ background: active ? "#cbd5e1" : "" }}
      className={cn(
        "flex items-center justify-between text-[14px] cursor-pointer hover:bg-[#cbd5e12f] rounded-lg p-2 select-none",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {Icon}
        <div className="font-normal">{label}</div>
      </div>
      {showCount && (
        <Paper className="bg-slate-200 p-0 py-[1px] text-center w-[40px] border rounded-lg font-medium">{count}</Paper>
      )}
    </div>
  );
}
