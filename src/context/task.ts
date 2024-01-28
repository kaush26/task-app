
import { TaskType } from "@/components/TaskList";
import { createContext } from "react";

export type TaskContextType = {
  tasks: TaskType[],
  setTasks: (tasks: TaskType[]) => void
}

const TasksContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => { }
})

export default TasksContext