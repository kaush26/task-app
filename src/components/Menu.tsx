import { useNavigate, useLocation, Link } from "react-router-dom";
import { LuChevronsRight, LuListChecks, LuLogOut, LuMenu } from "react-icons/lu";
import Paper from "./ui/paper";
import { Separator } from "./ui/separator";
import ListItem from "./ListItem";
import ColorBox from "./ColorBox";
import ListGroup from "./ListGroup";
import { Button } from "./ui/button";
import React from "react";
import ListsContext, { ListContextType } from "@/context/list";
import TasksContext, { TaskContextType } from "@/context/task";
import { dateCompare } from "@/lib/utils";
import AuthContext from "@/context/auth";

export default function Menu() {
  const { setAuth } = React.useContext(AuthContext);
  const { lists } = React.useContext<ListContextType>(ListsContext);
  const { tasks } = React.useContext<TaskContextType>(TasksContext);
  const [location, navigate] = [useLocation(), useNavigate()];
  const id = location.pathname;

  function handleLogOut() {
    setAuth({ isAuth: false, token: "" });
    localStorage.removeItem("token");
  }

  return (
    <Paper className="flex flex-col grow-0 min-w-[20%] h-[calc(100dvh-46px)] p-0 shrink-0 ">
      <header className="flex flex-col p-[26px] gap-4">
        <header className="flex items-center justify-between">
          <div className="text-[20px] font-bold">Menu</div>
          <LuMenu className="cursor-pointer" strokeWidth={3} />
        </header>
      </header>

      <div className="flex flex-col grow overflow-auto">
        <div className="flex flex-col gap-3 p-[26px]">
          <ListGroup labelClassName="ml-2" label="TASKS">
            <ListItem
              Icon={<LuChevronsRight />}
              label="Upcoming"
              count={tasks.filter((task) => dateCompare(task.dueDate, new Date(), (a, b) => a > b)).length}
              showCount
              active={id === "/task/upcoming"}
              onClick={() => navigate("/task/upcoming")}
            />
            <ListItem
              Icon={<LuListChecks />}
              label="Today"
              count={tasks.filter((task) => dateCompare(task.dueDate, new Date(), (a, b) => a === b)).length}
              showCount
              active={id === "/task/today"}
              onClick={() => navigate("/task/today")}
            />
          </ListGroup>
          <Separator />

          <ListGroup labelClassName="ml-2" label={"LISTS"}>
            {lists.map((list) => (
              <ListItem
                key={list._id}
                Icon={<ColorBox color={list.ragColor} />}
                label={list.label}
                count={list.tasks.length}
                active={id === `/lists/${list._id}`}
                showCount
                onClick={() => navigate(`/lists/${list._id}`)}
              />
            ))}
            {/* <ListItem Icon={<LuPlus />} label="Add New List" showCount={false} onClick={() => console.log("CLICKED")} /> */}
            <Button className="w-full my-4">
              <Link to="/lists">Show all Lists</Link>
            </Button>
          </ListGroup>
        </div>
      </div>

      <Button variant={"ghost"} onClick={handleLogOut} className="flex shrink-0 h-[60px] w-full p-[26px]">
        <div className="flex items-center gap-4 w-full">
          <LuLogOut />
          <div className="font-semibold">Sign Out</div>
        </div>
      </Button>
    </Paper>
  );
}
