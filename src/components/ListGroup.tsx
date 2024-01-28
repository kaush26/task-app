import { cn } from "@/lib/utils";

export default function ListGroup({
  label = "",
  className = "",
  labelClassName,
  children,
}: {
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  labelClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 text-[12px] font-bold", className)}>
      <div className={cn(labelClassName)}>{label}</div>
      <div>{children}</div>
    </div>
  );
}
