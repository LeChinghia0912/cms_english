"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { routes } from "@/configs";
import { FormInput } from "@/components/Forms";
import { Button, HeadLine } from "@/components";

const Login = () => {
  const { push } = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (value) => {
    try {
      const { email, password } = value;

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if(!result.ok) {
        toast.error("Tài khoản hoặc mật khẩu không chính xác");
      }else {
        toast.success("Đăng nhập thành công");
        push(routes.dashboard);
      }

    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleError = useCallback(() => toast.error("Bạn chưa nhập đầy đủ thông tin"), []);

  return (
    <div className="flex-col min-h-screen gap-4 flex-center">
      <div className="p-4 w-[500px] max-w-[calc(100%-24px)] border-[1px] border-stone-300 shadow-lg rounded-sm bg-white">
        <HeadLine title="ĐĂNG NHẬP" containerClassName="text-center mb-5" />

        <div className="flex flex-col gap-3">
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Nhập Email"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            inputType="password"
            placeholder="Nhập Password"
          />

          <Button
            title="Đăng Nhập"
            onClick={handleSubmit(onSubmit, handleError)}
            buttonClassName="bg-primary text-white hover:bg-primary hover:opacity-80 transition-base"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
