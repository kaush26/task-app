import { ListType } from "@/components/Lists";
import { createContext } from "react";

export type ListContextType = {
  lists: ListType[],
  setLists: (lists: ListType[]) => void
}

const ListsContext = createContext<ListContextType>({
  lists: [],
  setLists: () => { }
})

export default ListsContext