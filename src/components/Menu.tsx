import { LuChevronsRight, LuContact2, LuListChecks, LuLogOut, LuMenu, LuPlus, LuUsers2, LuX } from "react-icons/lu";
import Paper from "./ui/paper";
import Search from "./Search";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ListItem from "./ListItem";
import ColorBox from "./ColorBox";
import ListGroup from "./ListGroup";

export default function Menu() {
  return (
    <Paper className="flex flex-col grow-0 min-w-[20%] h-[calc(100dvh-46px)] p-0 shrink-0 ">
      <header className="flex flex-col p-[26px] gap-4">
        <header className="flex items-center justify-between">
          <div className="text-[20px] font-bold">Menu</div>
          <LuMenu className="cursor-pointer" strokeWidth={3} />
        </header>
        <Search />
      </header>

      <div className="flex flex-col grow overflow-auto">
        <div className="flex flex-col gap-7 p-[26px]">
          <ListGroup label="TASKS">
            <ListItem Icon={<LuChevronsRight />} label="Upcoming" count={3} showCount />
            <ListItem Icon={<LuListChecks />} label="Today" count={3} showCount />
            <ListItem Icon={<LuUsers2 />} label="Assigned" count={32} showCount />
          </ListGroup>
          <Separator />

          <ListGroup label="CONTACTS">
            <ListItem Icon={<LuContact2 />} label="Peoples" count={5} showCount />
          </ListGroup>
          <Separator />

          <ListGroup label="LISTS">
            <ListItem Icon={<ColorBox className="bg-[red] opacity-[0.6]" />} label="Personal" count={3} showCount />
            <ListItem Icon={<ColorBox className="bg-[#2679ff] opacity-[0.6]" />} label="Work" count={3} showCount />
            <ListItem Icon={<ColorBox className="bg-[#d9ff00] opacity-[0.6]" />} label="Milestone" count={32} showCount />
            <ListItem Icon={<LuPlus />} label="Add New List" showCount={false} onClick={() => console.log("CLICKED")} />
          </ListGroup>
          <Separator />

          <ListGroup label="TAGS">
            <div className="flex gap-2 flex-wrap">
              <TagPills className="bg-[#fcbfff7f]">Imp</TagPills>
              <Badge />
              <Badge />
              <Badge />
              <Button variant={"ghost"}>
                <LuPlus className="mr-2" />
                Add Tag
              </Button>
            </div>
          </ListGroup>
        </div>
      </div>

      <div className="flex shrink-0 h-[60px] p-[26px]">
        <ListItem Icon={<LuLogOut />} label={<div className="font-semibold">Sign Out</div>} />
      </div>
    </Paper>
  );
}

function TagPills({
  className = "",
  bg = "#3d4353",
  label,
  onClose,
  children,
}: {
  className?: string;
  bg?: string;
  label?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn(`flex items-center justify-center gap-3 bg-[${bg}] rounded-lg p-3 font-semibold`, className)}>
      {children || label}
      <LuX onClick={onClose} className="cursor-pointer" />
    </div>
  );
}
