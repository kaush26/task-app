import TodayTaskPage from "./app/task/today/page";
import UpcomingTaskPage from "./app/task/upcoming/page";
import ListPage from "./app/list/page";
import Tasks from "./components/Tasks";

type RoutesTypes = {
  id: string;
  label: React.ReactNode;
  component: React.FC;
};

const routes: RoutesTypes[] = [
  { id: "/task/upcoming", label: "Upcoming", component: UpcomingTaskPage },
  { id: "/task/today", label: "Today", component: TodayTaskPage },
  { id: "/lists/:id", label: "Tasks", component: Tasks },
  { id: "/lists", label: "Lists", component: ListPage },
];

// const routes = [
//   {
//     id: "/task",
//     label: "Tasks",
//     children: [
//       {
//         id: "/upcoming",
//         label: "Upcoming",
//         element: <UpcomingTaskPage />,
//       },
//       {
//         id: "/today",
//         label: "Today",
//         element: <TodayTaskPage />,
//       },
//     ],
//   },
// ];

export default routes;
