import { TaskType } from "@/components/TaskList";
import TaskPage from "@/components/TaskPage";
import TasksContext, { TaskContextType } from "@/context/task";
import { dateCompare } from "@/lib/utils";
import React from "react";

export default function TodayTaskPage() {
  const { tasks, setTasks } = React.useContext<TaskContextType>(TasksContext);
  const todayTasks = tasks.filter((task) => dateCompare(task.dueDate, new Date(), (a, b) => a === b));

  function handleSetTasks(todayTasks: TaskType[]) {
    setTasks(
      tasks.map((task) => {
        if (dateCompare(task.dueDate, new Date(), (a, b) => a === b)) {
          return todayTasks.find((todayTask) => todayTask._id === task._id)!;
        }
        return task;
      })
    );
  }

  return <TaskPage tasks={todayTasks} label="Today" count={todayTasks.length} setTasks={handleSetTasks} />;
}
