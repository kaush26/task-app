import { TaskType } from "@/components/TaskList";
import TaskPage from "@/components/TaskPage";
import TasksContext, { TaskContextType } from "@/context/task";
import { dateCompare } from "@/lib/utils";
import React from "react";

export default function UpcomingTaskPage() {
  const { tasks, setTasks } = React.useContext<TaskContextType>(TasksContext);
  const upcomingTasks = tasks.filter((task) => dateCompare(task.dueDate, new Date(), (a, b) => a > b));

  function handleSetTasks(upcomingTasks: TaskType[]) {
    setTasks(
      tasks.map((task) => {
        if (dateCompare(task.dueDate, new Date(), (a, b) => a > b)) {
          return upcomingTasks.find((upcomingTask) => upcomingTask._id === task._id)!;
        }
        return task;
      })
    );
  }

  return <TaskPage tasks={upcomingTasks} label="Upcoming" count={upcomingTasks.length} setTasks={handleSetTasks} />;
}
