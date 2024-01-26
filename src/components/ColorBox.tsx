import { cn } from "@/lib/utils";

type ColorType = {
  className: string;
};

export default function ColorBox({ className = "" }: ColorType) {
  return <div className={cn("rounded-sm w-4 h-4 border shadow opacity-[0.62]", className)} />;
}
