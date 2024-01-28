import { LuCalendar, LuCheckCircle2, LuClock2, LuHistory, LuUser2 } from "react-icons/lu";
import ListItem from "./ListItem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ColorBox from "./ColorBox";
import { Checkbox } from "./ui/checkbox";
import ListGroup from "./ListGroup";
import { ListType } from "./Lists";

export type TaskType = {
  _id?: string;
  title: string;
  description: string;
  list?: ListType;
  createdTime: Date;
  updatedTime: Date;
  dueDate: Date;
  status: string;
};

const STATUS: { [key: string]: { icon: JSX.Element; color: string; label: React.ReactNode } } = {
  pending: { icon: <LuHistory />, color: "red", label: "Pending" },
  completed: { icon: <LuCheckCircle2 />, color: "green", label: "Completed" },
  progress: { icon: <LuClock2 />, color: "black", label: "In Progress" },
};

export default function TaskList({
  tasks,
  onSelect,
  onChecked,
}: {
  tasks: TaskType[];
  onChecked?: (taskId: string | undefined, checked: boolean) => void;
  onSelect: (task: TaskType) => void;
}) {
  return (
    <div>
      <Accordion type="single">
        {tasks.map((task) => (
          <AccordionItem key={task?._id} value={task?._id || ""}>
            <div className="flex items-center gap-[16px] w-full ">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={(checked: boolean) => onChecked?.(task?._id, checked)}
              />
              <div className="w-full">
                <AccordionTrigger onClick={() => onSelect(task)}>
                  <div style={{ textDecoration: task.status === "completed" ? "line-through" : "" }}>{task.title}</div>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <div className="flex items-center gap-[16px]">
                <ListGroup label="DUE DATE" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={<LuCalendar />}
                    label={new Date(task.dueDate).toDateString()}
                  />
                </ListGroup>

                <ListGroup label="LIST" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={task.list ? <ColorBox color={task.list.ragColor} /> : <></>}
                    label={task.list?.label || "Empty"}
                  />
                </ListGroup>

                {/* <ListGroup label="ASSIGNED BY" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem className="hover:bg-transparent cursor-default" Icon={<LuUser2 />} label={task.createdBy} />
                </ListGroup> */}

                <ListGroup label="STATUS" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={STATUS[task.status]?.icon}
                    label={STATUS[task.status]?.label}
                  />
                </ListGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
