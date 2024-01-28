import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import AuthContext from "@/context/auth";
import { FormikProvider, useField, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("email is invalid.").required(),
  password: Yup.string()
    .required()
    .min(4, "Password is too short - should be 4 chars minimum.")
    .max(7, "Password is too long - should be 7 chars maximum.")
    .matches(/([a-zA-Z]|\d)/, "Password can only contain A-Z, a-z, 0-9."),
});

export default function LoginPage({ onSubmit }: { onSubmit: (token: string) => void }) {
  const { auth } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (_, actions) => {
      actions.validateForm();
      handleSubmit();
    },
  });

  React.useEffect(() => {
    const { isAuth } = auth;
    if (isAuth) return navigate("/");
  }, [auth]);

  async function handleSubmit() {
    if (!formik.isValid) return;
    setIsLoading(true);
    const payload = { ...formik.values };
    const { statusCode, error, token } = await new API().call({ cmd: "login", payload });
    setIsLoading(false);
    if (statusCode === 500) {
      return toast({ title: error.message, variant: "destructive" });
    }
    onSubmit(token);
  }

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        onReset={formik.handleReset}
        className="flex flex-col justify-between w-full h-full"
      >
        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <InputText
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <InputText
              id="password"
              name="password"
              placeholder="password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
        </div>
        <Button disabled={isLoading} className="mt-[62px]" type="submit">
          Sign In
        </Button>
      </form>
    </FormikProvider>
  );
}

function InputText(
  props:
    | {
        id: string;
        type: string;
        name: string;
        className?: string;
        placeholder?: string;
        autoComplete?: string;
        disabled?: boolean;
      } & InputProps
) {
  const [fields, meta] = useField(props.name);
  return (
    <div className="flex flex-col">
      <Input {...fields} {...props} />
      <div className="text-red-500 h-3 text-[14px] leading-3">{meta.error}</div>
    </div>
  );
}
