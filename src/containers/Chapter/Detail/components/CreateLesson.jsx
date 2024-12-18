import { get } from "lodash";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { httpRequest } from "@/utils";
import { Lesson } from "@/yups/lesson";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";

const CreateLesson = () => {
  const paramas = useParams();
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);
  
  const { control, handleSubmit, reset } = useForm({
    resolver: Lesson,
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
        url: "lesson/created",
        data: {
          ...value,
          chapter_id: paramas.id
        },
        headers: { Authorization: `Bearer ${access_token}` },
      });

      toast.success("Tạo bài mới thành công");
      reset({
        name: "",
        title: "",
        poster: "",
      })
    } catch (error) {
      toast.error("Có lỗi xảy ra, thử lại sau");
    }
  }, [access_token]);

  return (
    <Drawer labelOpen="create-lesson" heading="Tạo Mới" listClassName="w-[500px]">
      <div className="flex flex-col gap-4 px-4">
        <FormInput
          control={control}
          name="name"
          label="Tên Bài Học"
          placeholder="Nhập Tên Bài Học"
        />
        
        <FormInput
          control={control}
          name="title"
          label="Tiêu Đề Bài Học"
          placeholder="Nhập Tiêu Đề Bài Học"
        />

        <FormInput
          control={control}
          name="poster"
          label="Poster"
          placeholder="Nhập URL poster"
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

export default CreateLesson;
