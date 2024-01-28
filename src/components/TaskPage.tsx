import React from "react";
import TaskList, { TaskType } from "@/components/TaskList";
import TaskView from "./TaskView";
import Page from "./Page";
import AddButton from "./AddButton";
import API from "@/api/api";

const emptyTask = {
  _id: "",
  title: "",
  description: "",
  status: "progress",
  createdTime: new Date(),
  dueDate: new Date(),
  updatedTime: new Date(),
};

type TaskPagePropTypes = {
  tasks: TaskType[];
  label: React.ReactNode;
  count: number;
  setTasks?: (tasks: TaskType[]) => void;
};

export default function TaskPage({ tasks, label, count, setTasks }: TaskPagePropTypes) {
  const [task, setTask] = React.useState<TaskType>(emptyTask);
  const [openTaskView, setOpenTaskView] = React.useState(false);

  function handleSelectTask(task: TaskType) {
    setTask(task);
    setOpenTaskView(true);
  }

  async function handleTaskChecks(taskId: string | undefined, checked: boolean) {
    const taskIndex = tasks.findIndex((d) => d._id === taskId);
    const tasks_ = [...tasks];
    const status = checked ? "completed" : new Date(tasks_[taskIndex].dueDate) < new Date() ? "pending" : "progress";
    tasks_[taskIndex] = { ...tasks_[taskIndex], status };

    // api call
    const res = await new API().call({ cmd: "updateTask", payload: { _id: taskId, status } });
    // console.log(tasks_);
    setTasks?.(tasks_);
  }

  return (
    <Page
      label={label}
      count={count}
      openView={openTaskView}
      View={<TaskView task={task} onClose={() => setOpenTaskView(false)} />}
    >
      <AddButton
        onClick={() => {
          setTask(emptyTask);
          setOpenTaskView(true);
        }}
      >
        Add New Task
      </AddButton>
      <TaskList tasks={tasks} onSelect={handleSelectTask} onChecked={handleTaskChecks} />
    </Page>
  );
}
