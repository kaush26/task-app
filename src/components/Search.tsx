import { cn } from "../lib/utils";
import { LuSearch } from "react-icons/lu";

export default function Search({ className = "" }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-[8px] border p-2", className)}>
      <LuSearch className="shrink-0" />
      <input type="text" spellCheck={false} className="bg-transparent outline-none w-[100%]" placeholder="Search..." />
    </div>
  );
}
