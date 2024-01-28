import { FormikProvider, useField, useFormik } from "formik";
import { ListType } from "./Lists";
import View from "./View";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LuTrash2 } from "react-icons/lu";
import { COLORS } from "@/constant/color";
import ColorBox from "./ColorBox";
import { useContext, useEffect, useState } from "react";
import API from "@/api/api";
import ListsContext from "@/context/list";
import Alert from "./Alert";
import { toast } from "./ui/use-toast";
import * as Yup from "yup";

type ListViewPropsType = {
  list: ListType;
  className?: string;
  onClose?: () => void;
};

const validationSchema = Yup.object().shape({
  label: Yup.string().required("List title is required"),
});

export default function ListView({ list, className, onClose }: ListViewPropsType) {
  const { lists, setLists } = useContext(ListsContext);
  const [selectedColor, setSelectedColor] = useState(list.ragColor || COLORS[0]);
  useEffect(() => {
    setSelectedColor(list.ragColor || COLORS[0]);
  }, [list]);

  const formik = useFormik({
    initialValues: list,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (_values, { validateForm }) => {
      validateForm();
      handleSubmit();
    },
  });

  async function handleSubmit() {
    if (list._id) {
      const payload = {
        _id: list._id,
        label: formik.values.label,
        ragColor: selectedColor,
      };

      const { statusCode, error } = await new API().call({ cmd: "updateList", payload });
      if (statusCode === 500) return toast({ title: error.message, variant: "destructive" });

      setLists(
        lists.map((d) => {
          if (d._id === list._id) return { ...d, ...payload, updatedTime: new Date() };
          return d;
        })
      );
    } else {
      const payload = {
        label: formik.values.label,
        ragColor: selectedColor,
      };
      const list = await new API().call({ cmd: "addList", payload });
      delete list.__v;
      setLists([...lists, list]);
    }
    onClose?.();
  }

  async function handleDelete() {
    const res = await new API().call({ cmd: "deleteList", payload: { _id: list._id } });
    if (!res?.deletedCount) return;
    setLists(lists.filter((d) => d._id !== list._id));
    onClose?.();
  }

  return (
    <View label={list._id ? "List" : "New List"} className={className} onClose={onClose}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="mt-4 flex flex-col h-full gap-[62px]">
          <div className="flex flex-col grow gap-[62px]">
            <InputText name="label" type="text" placeholder="Title" />

            <div className="flex flex-wrap gap-1">
              {COLORS.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  active={color === selectedColor}
                  onClick={() => setSelectedColor(color)}
                  className="w-[26px] h-[26px] cursor-pointer hover:scale-[1.026]"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 w-full">
            <Button type="submit" className="w-full p-6">
              Save
            </Button>
            {list._id && (
              <Alert
                title="Are you sure want to delete this list?"
                description="This list cannot be undone. This will permanently delete your
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
