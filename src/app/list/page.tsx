import AddButton from "@/components/AddButton";
import ListView from "@/components/ListView";
import Lists, { ListType } from "@/components/Lists";
import Page from "@/components/Page";
import ListsContext from "@/context/list";
import React from "react";

const emptyList: ListType = {
  _id: "",
  label: "",
  ragColor: "",
  tasks: [],
  createdTime: new Date(),
  updatedTime: new Date(),
};

export default function ListPage() {
  const [openListView, setOpenListView] = React.useState(false);
  const [list, setList] = React.useState<ListType>(emptyList);
  const { lists } = React.useContext(ListsContext);

  return (
    <Page
      label="Lists"
      count={lists.length}
      openView={openListView}
      View={<ListView list={list} onClose={() => setOpenListView(false)} />}
    >
      <AddButton
        onClick={() => {
          setList(emptyList);
          setOpenListView(true);
        }}
      >
        Add New List
      </AddButton>
      <Lists
        lists={lists}
        onSelect={(list) => {
          setList(list);
          setOpenListView(true);
        }}
      />
    </Page>
  );
}
