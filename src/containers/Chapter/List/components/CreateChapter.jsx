import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { httpRequest } from "@/utils";
import { Chapter } from "@/yups/chapter";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";
import { useSession } from "next-auth/react";
import { get } from "lodash";

const CreateChapter = () => {
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const { control, handleSubmit, reset } = useForm({
    resolver: Chapter,
    defaultValues: {
      name: "",
      title: "",
      poster: "",
    },
  });

  const onSubmit = useCallback(async(value) => {
    try {
      await httpRequest({
        method: "POST",
        url: "chapters/created",
        data: value,
        headers: {
          Authorization: `Bearer ${access_token}`
        },
      });

      toast.success("Tạo mới chương thành công");

      reset({ name: "", title: "", poster: "" });

    } catch (error) {
      toast.error("Có lỗi xảy ra, thử lại sau");
    }
  }, [access_token])

  return (
    <Drawer labelOpen="create-chapter" heading="Tạo Mới" listClassName="w-[500px]">
      <div className="flex flex-col gap-4 px-4">
        <FormInput
          control={control}
          name="name"
          label="Tên Chương"
          placeholder="Nhập Tên Chương"
        />

        <FormInput
          control={control}
          name="title"
          label="Tiêu Đề Chương"
          placeholder="Nhập Tiêu Đề Chương"
        />

        <FormInput
          control={control}
          name="poster"
          label="Poster"
          placeholder="Nhập URL poster"
        />

        <Button title="Tạo Mới" buttonClassName="bg-red-500 hover:bg-red-500 text-white hover:opacity-90" onClick={handleSubmit(onSubmit)}  />
      </div>
    </Drawer>
  );
};

export default CreateChapter;
