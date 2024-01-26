import { cn } from "@/lib/utils";

export default function ListGroup({
  label = "",
  className = "",
  children,
}: {
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4 text-[12px] font-bold", className)}>
      <div>{label}</div>
      {children}
    </div>
  );
}
