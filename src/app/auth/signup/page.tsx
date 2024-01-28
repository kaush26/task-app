import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProvider, useField, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import API from "@/api/api";

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email("email is invalid.").required(),
  password: Yup.string()
    .required()
    .min(4, "Password is too short - should be 4 chars minimum.")
    .max(7, "Password is too long - should be 7 chars maximum.")
    .matches(/([a-zA-Z]|\d)/, "Password can only contain A-Z, a-z, 0-9."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Password must match")
    .required(),
});

export default function SignUpPage({ onSubmit }: { onSubmit: (token: string) => void }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (v, actions) => {
      actions.validateForm();
      handleSubmit();
    },
  });

  async function handleSubmit() {
    if (!formik.isValid) return;
    setIsLoading(true);
    const payload = { ...formik.values };
    const signupRes = await new API().call({
      cmd: "signUp",
      payload,
    });

    if (signupRes.statusCode === 500) {
      setIsLoading(false);
      return toast({ title: signupRes?.error.message, variant: "destructive" });
    }

    const loginRes = await new API().call({
      cmd: "login",
      payload: { email: payload.email, password: payload.password },
    });

    if (loginRes.statusCode === 500) {
      setIsLoading(false);
      return toast({ title: loginRes?.error.message, variant: "destructive" });
    }
    setIsLoading(false);
    onSubmit(loginRes.token);
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
            <Label htmlFor="username">Name</Label>
            <InputText
              id="username"
              name="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
        </div>
        <Button disabled={isLoading} className="mt-[62px]" type="submit">
          Sign up and continue
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
