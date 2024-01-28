import * as React from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import LoginPage from "./login/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpPage from "./signup/page";
import AuthContext from "@/context/auth";
import ListsContext from "@/context/list";
import TasksContext from "@/context/task";
import API from "@/api/api";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className }: UserAuthFormProps) {
  const { type } = useParams();
  const { setAuth } = React.useContext(AuthContext);
  const { setLists } = React.useContext(ListsContext);
  const { setTasks } = React.useContext(TasksContext);
  const navigate = useNavigate();

  async function handleSubmit(token: string) {
    await new Promise((resolve) => {
      setAuth({ isAuth: true, token });
      resolve(localStorage.setItem("token", token));
    });
    const [tasks, lists] = await Promise.all([new API().call({ cmd: "getTasks" }), new API().call({ cmd: "getLists" })]);
    setLists(lists);
    setTasks(tasks);
  }

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-46px)]">
      <div className={cn("flex flex-col items-center justify-between h-[500px] ", className)}>
        <Tabs defaultValue={type} className="w-[430px]">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="grow" onClick={() => navigate("/auth/login")}>
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="grow" onClick={() => navigate("/auth/signup")}>
              SignUp
            </TabsTrigger>
          </TabsList>
          <TabsContent value={type} className="gap-4 p-12 border rounded-lg ">
            {type === "signup" ? <SignUpPage onSubmit={handleSubmit} /> : <LoginPage onSubmit={handleSubmit} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
