import React from "react";
import "./App.css";
import Router from "./router";
import ListsContext from "./context/list";
import API from "./api/api";
import { ListType } from "./components/Lists";
import { TaskType } from "./components/TaskList";
import TasksContext from "./context/task";
import { Toaster } from "./components/ui/toaster";
import AuthContext, { AuthDataType } from "./context/auth";

function App() {
  const [auth, setAuth] = React.useState<AuthDataType>({ isAuth: false, token: "" });
  const [lists, setLists] = React.useState<ListType[]>([]);
  const [tasks, setTasks] = React.useState<TaskType[]>([]);
  const [ready, setReady] = React.useState(false);

  async function fetchIndex() {
    const [tasks, lists] = await Promise.all([new API().call({ cmd: "getTasks" }), new API().call({ cmd: "getLists" })]);
    if (tasks.statusCode === 500 || lists.statusCode === 500) {
      return setReady(true);
    }
    setLists(lists);
    setTasks(tasks);

    const { statusCode } = await new API().call({ cmd: "auth" });
    if (statusCode === 200) {
      setAuth({ isAuth: true, token: localStorage.getItem("token")! });
    }
    setReady(true);
  }
  React.useEffect(() => {
    fetchIndex();
  }, []);

  if (!ready) return;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <ListsContext.Provider value={{ lists, setLists }}>
          <Router />
          <Toaster />
        </ListsContext.Provider>
      </TasksContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
