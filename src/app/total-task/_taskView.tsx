import ColorBox from "@/components/ColorBox";
import Combobox from "@/components/ComboBox";
import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import Paper from "@/components/ui/paper";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormikProvider, useFormik } from "formik";
import { LuX } from "react-icons/lu";

const LISTS = [
  {
    label: (
      <div className="flex items-center gap-4">
        <ColorBox className="bg-[red]" /> Personal
      </div>
    ),
    value: "sdfsdfsd",
  },
  { label: "Work", value: "srfg" },
];

type TaskViewTypes = {
  className?: string;
  onClose?: () => void;
};

export default function TaskView({ className = "", onClose }: TaskViewTypes) {
  const formik = useFormik({
    initialValues: {},
    validationSchema: {},
    onSubmit: (values, actions) => {},
  });
  return (
    <Paper className="w-[34dvw]">
      <header className="flex items-center justify-between text-[20px] font-semibold">
        <div className="">Task</div>
        <LuX className="cursor-pointer" onClick={onClose} />
      </header>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="mt-4 flex flex-col gap-[62px]">
          <Section>
            <Input type="text" placeholder="Title" />
            <Textarea className="resize-none h-[100px]" placeholder="Description" />
          </Section>

          <Section className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <div className="font-semibold">List</div>
              <Combobox items={LISTS} selected={LISTS[1]} placeholder="Select List..." />
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold">Due Date</div>
              <DatePicker onChange={console.log} fromDate={new Date()} />
            </div>
          </Section>
        </form>
      </FormikProvider>
    </Paper>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}
