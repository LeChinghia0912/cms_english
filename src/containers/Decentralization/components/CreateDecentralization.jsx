import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { httpRequest } from "@/utils";
import { Chapter } from "@/yups/chapter";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";
import { useSession } from "next-auth/react";
import { get } from "lodash";
import { Auth } from "@/yups/auth";

const CreateDecentralization = () => {
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const { control, handleSubmit, reset } = useForm({
    resolver: Auth,
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      age: "",
      level: "",
      phone: "",
    },
  });

  const onSubmit = useCallback(
    async (value) => {
      try {
        await httpRequest({
          method: "POST",
          url: "auth/register",
          data: value,
        });

        toast.success("Tạo mới người dùng thành công");

        reset({
          email: "",
          password: "",
          fullname: "",
          age: "",
          level: "",
          phone: "",
        });

        // window.location.reload();
      } catch (error) {
        toast.error("Có lỗi xảy ra, thử lại sau");
      }
    },
    [access_token, reset]
  );

  return (
    <Drawer
      labelOpen="create-decentralization"
      heading="Tạo Mới"
      listClassName="w-[500px]"
    >
      <div className="flex flex-col gap-4 px-4">
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Nhập email"
        />

        <FormInput
          inputType="password"
          control={control}
          name="password"
          label="Password"
          placeholder="Nhập password"
        />

        <FormInput
          control={control}
          name="fullname"
          label="Họ và tên"
          placeholder="Nhập họ và tên"
        />

        <FormInput
          control={control}
          name="age"
          label="Tuổi"
          placeholder="Nhập tuổi"
        />

        <FormInput
          control={control}
          name="level"
          label="Trình độ"
          placeholder="Nhập trình độ"
        />

        <FormInput
          control={control}
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
        />

        <Button
          title="Tạo Mới"
          buttonClassName="bg-red-500 hover:bg-red-500 text-white hover:opacity-90"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Drawer>
  );
};

export default CreateDecentralization;
