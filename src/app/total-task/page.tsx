import TaskList, { TaskType } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import Paper from "@/components/ui/paper";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import TaskView from "./_taskView";

const TASKS = [
  {
    _id: "sdhfsdf",
    createdBy: "Kaushal",
    createdTime: "11/11/11",
    description: "It's a description",
    dueDate: "11/11/11",
    list: { label: "Personal", id: "sdfsdf" },
    title: "Research the unknown",
    tags: [{ label: "t1", id: "sdf" }],
    updatedTime: "11/11/11",
    completed: false,
  },
  {
    _id: "sdhf",
    createdBy: "Kaushal",
    createdTime: "11/11/11",
    description: "It's a description",
    dueDate: "11/11/11",
    list: { label: "Personal", id: "sdfsdf" },
    title: "Research the unknown",
    tags: [{ label: "t1", id: "sdf" }],
    updatedTime: "11/11/11",
    completed: true,
  },
  {
    _id: "ssdf",
    createdBy: "Kaushal",
    createdTime: "11/11/11",
    description: "It's a description",
    dueDate: "11/11/11",
    list: { label: "Personal", id: "sdfsdf" },
    title: "Research the unknown",
    tags: [{ label: "t1", id: "sdf" }],
    updatedTime: "11/11/11",
    completed: false,
  },
];

export default function TotalTaskPage() {
  const [openTaskView, setOpenTaskView] = useState(false);
  const [tasks, setTasks] = useState(TASKS);

  function handleSelectTask(task: TaskType) {
    setOpenTaskView(true);
  }

  function handleTaskChecks(taskId: string, checked: boolean) {
    const taskIndex = tasks.findIndex((d) => d._id === taskId);
    const tasks_ = [...tasks];
    tasks_[taskIndex] = { ...tasks_[taskIndex], completed: checked };
    setTasks(tasks_);
  }
  return (
    <div className="flex w-full gap-[20px]">
      <div className="grow h-[calc(100dvh-46px)] overflow-auto">
        <header className="flex gap-[34px] mb-[62px] font-bold">
          <div className="text-[62px] leading-[62px]">Today</div>
          <div className="flex items-center justify-center border rounded-lg min-w-[60px] text-[50px] font-medium leading-[50px]">
            5
          </div>
        </header>
        <Button variant={"outline"} className="w-full p-[26px]" onClick={() => setOpenTaskView(true)}>
          <div className="flex items-center gap-[16px] w-full">
            <LuPlus />
            Add New Task
          </div>
        </Button>
        <TaskList tasks={tasks} onSelect={handleSelectTask} onChecked={handleTaskChecks} />
      </div>
      {openTaskView && <TaskView onClose={() => setOpenTaskView(false)} />}
    </div>
  );
}
