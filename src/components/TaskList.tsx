import { LuCalendar, LuUser2 } from "react-icons/lu";
import ListItem from "./ListItem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ColorBox from "./ColorBox";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import ListGroup from "./ListGroup";

export type TaskType = {
  _id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  list: {
    label: string;
    id: string;
  };
  createdBy: string;
  createdTime: string;
  updatedTime: string;
  dueDate: string;
  tags: { label: string; id: string }[];
  completed: boolean;
};

export default function TaskList({
  tasks,
  onSelect,
  onChecked,
}: {
  tasks: TaskType[];
  onChecked?: (task: string, checked: boolean) => void;
  onSelect: (task: TaskType) => void;
}) {
  return (
    <div>
      <Accordion type="single">
        {tasks.map((task) => (
          <AccordionItem key={task._id} value={task._id}>
            <div className="flex items-center gap-[16px] w-full ">
              <Checkbox checked={task.completed} onCheckedChange={(checked: boolean) => onChecked?.(task._id, checked)} />
              <div className="w-full">
                <AccordionTrigger onClick={() => onSelect(task)}>
                  <div style={{ textDecoration: task.completed ? "line-through" : "" }}>{task.title}</div>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <div className="flex items-center gap-[16px]">
                <ListGroup label="DUE DATE" className="text-[10px] gap-1">
                  <ListItem Icon={<LuCalendar />} label={task.dueDate} />
                </ListGroup>
                <Separator orientation="vertical" className="h-[20px]" />
                <ListGroup label="LIST" className="text-[10px] gap-1">
                  <ListItem Icon={<ColorBox className="bg-[red]" />} label={task.list.label} />
                </ListGroup>
                <Separator orientation="vertical" className="h-[20px]" />
                <ListGroup label="ASSIGNED BY" className="text-[10px] gap-1">
                  <ListItem Icon={<LuUser2 />} label={task.createdBy} />
                </ListGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
