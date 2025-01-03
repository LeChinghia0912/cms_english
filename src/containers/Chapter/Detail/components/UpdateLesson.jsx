"use client";

import { get } from "lodash";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { httpRequest } from "@/utils";
import { Lesson } from "@/yups/lesson";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";

const UpdateLesson = ({ lesson, chapter }) => {
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const { control, handleSubmit } = useForm({
    resolver: Lesson,
    defaultValues: {
      name: lesson?.name.toLowerCase(),
      title: lesson?.title,
      poster: lesson?.poster,
      slug: lesson?.slug
    },
  });

  const onSubmit = useCallback(async({ name, title, poster }) => {
    try {
      const match = chapter.slug.match(/-(\d+)/);

      if (match) { 
        await httpRequest({
          method: "PATCH",
          url: `lesson/${lesson._id}`,
          headers: { Authorization: `Bearer ${access_token}` },
          data: { 
            name,
            title,
            poster,
            slug: name.replaceAll(" ", "-").toLowerCase().replace(/bài/g, "bai") + `-${match[1]}`
          },
        });
      }

      toast.success("Cập nhật bài học thành công");
      window.location.reload();

    } catch (error) {
      toast.error("Có lỗi xảy ra, thử lại sau");
    }
  }, [access_token, chapter]);

  return (
    <Drawer
      labelOpen="update-lesson"
      heading="Chỉnh sửa bài học"
      listClassName="w-[500px]"
    >
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
          title="Cập nhật"
          buttonClassName="bg-blue-500 hover:bg-blue-500 text-white hover:opacity-90"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Drawer>
  );
};

export default UpdateLesson;
