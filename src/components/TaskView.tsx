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
import { toast, useToast } from "./ui/use-toast";
import Alert from "./Alert";
import * as Yup from "yup";
import { ListType } from "./Lists";

type TaskViewTypes = {
  task: TaskType;
  className?: string;
  selectedDefaultList?: ListType;
  onClose?: () => void;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
});

export default function TaskView({ className, task, selectedDefaultList, onClose }: TaskViewTypes) {
  const { lists, setLists } = React.useContext(ListsContext);
  const { tasks, setTasks } = React.useContext<TaskContextType>(TasksContext);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(new Date());
  const [selectedList, setSelectedList] = React.useState<ItemType | null>({
    label: (
      <div className="flex items-center gap-4">
        <ColorBox color={selectedDefaultList?.ragColor ?? lists[0]?.ragColor} />{" "}
        {selectedDefaultList?.label ?? lists[0]?.label}
      </div>
    ),
    value: selectedDefaultList?._id ?? lists[0]?._id,
  });

  const toaster = useToast();

  const formik = useFormik({
    initialValues: task,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (_values, { setSubmitting, validateForm }) => {
      setSubmitting(false);
      validateForm();
      handleSubmit();
    },
  });

  async function handleSubmit() {
    if (!formik.isValid) return;
    const payload = { ...formik.values, dueDate, list: selectedList?.value };

    if (payload._id) {
      const { statusCode, error } = await new API().call({ cmd: "updateTask", payload });
      if (statusCode === 500) return toast({ title: error.message, variant: "destructive" });

      const [updatedTasks, updatedLists] = await Promise.all([
        new API().call({ cmd: "getTasks" }),
        new API().call({ cmd: "getLists" }),
      ]);
      setTasks(updatedTasks);
      setLists(updatedLists);
    } else {
      delete payload._id;

      const task = await new API().call({ cmd: "addTask", payload });
      delete task.__v;
      const newTask = { ...task, list: lists.find((list) => list._id === task.list) };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setLists(
        lists.map((list) => {
          if (list._id === payload.list) return { ...list, tasks: [...list.tasks, newTask] };
          return list;
        })
      );
    }
    onClose?.();
  }

  async function handleDelete() {
    const res = await new API().call({ cmd: "deleteTask", payload: { _id: task._id } });
    if (!res?.deletedCount) return;
    setTasks(tasks.filter((d) => d._id !== task._id));
    setLists(
      lists.map((list) => {
        if (list._id === task.list?._id) return { ...list, tasks: list.tasks.filter((t) => t._id !== task._id) };
        return list;
      })
    );

    toaster.toast({ title: "Task Deleted Successfully", variant: "destructive" });
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
            <Button type="submit" className="w-full p-6">
              Save
            </Button>
            {task._id && (
              <Alert
                title="Are you sure want to delete this task?"
                description="This task cannot be undone. This will permanently delete your
              account and remove your task from our servers."
                onContinue={handleDelete}
              >
                <Button variant={"destructive"} className="p-6">
                  <LuTrash2 />
                </Button>
              </Alert>
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
  const [fields, meta] = useField(props.name);

  switch (props.type) {
    case "text": {
      return (
        <div className="flex flex-col">
          <Input {...fields} {...props} />
          <div className="text-red-500 h-3 text-[14px] leading-3">{meta.error}</div>
        </div>
      );
    }
    case "textarea": {
      return (
        <div className="flex flex-col">
          <Textarea {...fields} {...props} />
          <div className="text-red-500 h-3 text-[14px] leading-3">{meta.error}</div>
        </div>
      );
    }
  }
}
