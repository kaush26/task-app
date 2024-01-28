import { LuCheckCircle2, LuClock2, LuHistory, LuListChecks } from "react-icons/lu";
import ListItem from "./ListItem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import ListGroup from "./ListGroup";
import ColorBox from "./ColorBox";
import { TaskType } from "./TaskList";

export type ListType = {
  _id: string;
  label: React.ReactNode;
  ragColor: string;
  createdTime: Date;
  updatedTime: Date;
  tasks: TaskType[];
};

type ListsPropsTypes = {
  lists: ListType[];
  onSelect: (list: ListType) => void;
};

export default function Lists({ lists, onSelect }: ListsPropsTypes) {
  return (
    <div>
      <Accordion type="single">
        {lists.map((list) => (
          <AccordionItem key={list?._id} value={list?._id}>
            <div className="flex items-center gap-[16px] w-full ">
              <div className="w-full">
                <AccordionTrigger onClick={() => onSelect(list)}>
                  <div className="flex items-center gap-4">
                    <ColorBox color={list.ragColor} />
                    {list.label}
                  </div>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <div className="flex items-center gap-[16px]">
                <ListGroup label="ALL TASKS" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={<LuListChecks />}
                    label={list.tasks.length ?? 0}
                  />
                </ListGroup>

                <ListGroup label="PENDING TASKS" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={<LuHistory />}
                    label={list.tasks.filter((task: TaskType) => task.status === "pending")?.length || 0}
                  />
                </ListGroup>

                <ListGroup label="PROGRESS TASKS" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={<LuClock2 />}
                    label={list.tasks.filter((task: TaskType) => task.status === "progress")?.length || 0}
                  />
                </ListGroup>
                <ListGroup label="COMPLETED TASKS" className="text-[10px] gap-[1px]" labelClassName="ml-2">
                  <ListItem
                    className="hover:bg-transparent cursor-default"
                    Icon={<LuCheckCircle2 />}
                    label={list.tasks.filter((task: TaskType) => task.status === "completed")?.length || 0}
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
