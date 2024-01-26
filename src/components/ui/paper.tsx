import { cn } from "../../lib/utils";

type PaperPropType = {
  children?: React.ReactNode;
  className?: string;
};

export default function Paper({ children, className = "" }: PaperPropType) {
  return <div className={cn("shrink-0 p-[26px] rounded-[16px] bg-[#f5f5f5] ", className)}>{children}</div>;
}
