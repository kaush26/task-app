import ColorBox from "@/components/ColorBox";
import Combobox, { ItemType } from "@/components/ComboBox";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormikProvider, useField, useFormik } from "formik";
import { LuTrash2 } from "react-icons/lu";
import { TaskType } from "./TaskList";
import React from "react";
import View from "./View";
import ListsContext from "@/context/list";
import TasksContext, { TaskContextType } from "@/context/task";
import API from "@/api/api";

type TaskViewTypes = {
  task: TaskType;
  className?: string;
  onClose?: () => void;
};

export default function TaskView({ className, task, onClose }: TaskViewTypes) {
  const { lists } = React.useContext(ListsContext);
  const { tasks, setTasks } = React.useContext<TaskContextType>(TasksContext);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(new Date());
  const [selectedList, setSelectedList] = React.useState<ItemType | null>({
    label: (
      <div className="flex items-center gap-4">
        <ColorBox color={lists[0]?.ragColor} /> {lists[0]?.label}
      </div>
    ),
    value: lists[0]?._id,
  });

  const formik = useFormik({
    initialValues: task,
    enableReinitialize: true,
    // validationSchema: {},
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      // console.log(values);
    },
  });

  async function handleSubmit() {
    const payload = { ...formik.values, dueDate, list: selectedList?.value };
    console.log(payload);
    if (task._id) {
      // api update
      const res = await new API().call({ cmd: "updateTask", payload });
      setTasks(
        tasks.map((d) => {
          if (d._id === task._id)
            return {
              ...d,
              ...formik.values,
              dueDate: dueDate ?? new Date(),
              list: lists.find((list) => list._id === selectedList?.value),
              updatedTime: new Date(),
            };
          return d;
        })
      );
    } else {
      // api add
      delete payload._id;

      const task = await new API().call({ cmd: "addTask", payload });
      delete task.__v;
      setTasks([...tasks, { ...task, list: lists.find((list) => list._id === task.list) }]);
    }
    onClose?.();
  }

  async function handleDelete() {
    const res = await new API().call({ cmd: "deleteTask", payload: { _id: task._id } });
    if (!res?.deletedCount) return;
    setTasks(tasks.filter((d) => d._id !== task._id));
    onClose?.();
  }

  return (
    <View label={task._id ? "Task" : "New Task"} className={className} onClose={onClose}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="mt-4 flex flex-col h-full gap-[62px]">
          <div className="flex flex-col grow gap-[62px]">
            <Section>
              <InputText name="title" type="text" placeholder="Title" />
              <InputText type="textarea" name="description" className="resize-none h-[200px]" placeholder="Description" />
            </Section>

            <Section className="grid grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="font-semibold">List</div>
                <Combobox
                  items={lists.map((list) => ({
                    label: (
                      <div className="flex items-center gap-4">
                        <ColorBox color={list.ragColor} /> {list.label}
                      </div>
                    ),
                    value: list._id,
                  }))}
                  selected={selectedList}
                  onSelectItem={setSelectedList}
                  placeholder="Select List..."
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold shrink-0">Due Date</div>
                <DatePicker date={formik.values.dueDate} onChange={setDueDate} fromDate={new Date()} />
              </div>
            </Section>
          </div>
          <div className="flex items-center gap-4 w-full">
            <Button type="submit" className="w-full p-6" onClick={handleSubmit}>
              Save
            </Button>
            {task._id && (
              <Button variant={"destructive"} className="p-6" onClick={handleDelete}>
                <LuTrash2 />
              </Button>
            )}
          </div>
        </form>
      </FormikProvider>
    </View>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

function InputText(props: { type: string; name: string; className?: string; placeholder?: string }) {
  const [fields, meta, helpers] = useField(props.name);

  // console.log(fields, meta, helpers);
  switch (props.type) {
    case "text": {
      return <Input {...fields} {...props} />;
    }
    case "textarea": {
      return <Textarea {...fields} {...props} />;
    }
  }
}
