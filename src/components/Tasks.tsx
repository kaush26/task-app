import { useParams } from "react-router-dom";
import TaskPage from "./TaskPage";
import React from "react";
import ListsContext from "@/context/list";
import TasksContext from "@/context/task";
import { TaskType } from "./TaskList";

export default function Tasks() {
  const { id } = useParams();
  const { lists, setLists } = React.useContext(ListsContext);
  const { tasks, setTasks } = React.useContext(TasksContext);

  const list = lists.find((list) => list._id === id);
  const listTasks = list?.tasks?.map((task) => ({ ...task, list })) || [];

  function handleSetTasks(listTasks: TaskType[]) {
    setLists(
      lists.map((li) => {
        if (li._id === id) return { ...li, tasks: listTasks };
        return li;
      })
    );

    setTasks(
      tasks.map((task) => {
        const listTask = listTasks.find((listTask) => listTask._id === task._id)!;
        return listTask ? listTask : task;
      })
    );
  }

  return <TaskPage tasks={listTasks} label={list?.label} count={list?.tasks.length || 0} setTasks={handleSetTasks} />;
}
