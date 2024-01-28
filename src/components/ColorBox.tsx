import { cn } from "@/lib/utils";

type ColorType = {
  className?: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
};

export default function ColorBox({ className, color, active = false, onClick }: ColorType) {
  return (
    <div
      className={cn("rounded-sm w-4 h-4  shadow opacity-[0.62]", className)}
      style={{ background: color, border: `2px solid ${color}`, boxShadow: active ? "inset 0px 0px 0px 2px #fff" : "none" }}
      onClick={onClick}
    />
  );
}
