"use client";

import { get } from "lodash";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Fragment, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, Pencil2Icon } from "@radix-ui/react-icons";

import { httpRequest } from "@/utils";
import { Chapter } from "@/yups/chapter";
import { FormInput } from "@/components/Forms";
import { Button, HeadLine } from "@/components";

const Update = ({ initData }) => {
  const params = useParams();
  const { push } = useRouter();
  const data = get(initData, ["0"]);

  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const { control, handleSubmit } = useForm({
    resolver: Chapter,
    defaultValues: {
      name: data.name.toLowerCase(),
      title: data.title,
      poster: data.poster,
      slug: data.name.replaceAll(" ", "-").toLowerCase().replace(/chương/g, "chuong")
    },
  });

  const onSubmit = useCallback(async({ name, title }) => {
    try {
      await httpRequest({
        method: "PATCH",
        url: `chapter/${params.id}`,
        data: {
          name,
          title,
          slug: name.replaceAll(" ", "-").toLowerCase().replace(/chương/g, "chuong")
        },
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      toast.success("Cập nhật chương thành công!");

    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  }, [access_token]);

  return (
    <Fragment>
      <HeadLine title="Cập nhật Chương" />

      <div className="flex flex-col gap-5 px-3 py-4 mt-8 mb-10 bg-white rounded-md shadow-md">
        <FormInput control={control} name="name" label="Tên chương" placeholder="Nhập Tên Chương" />
        <FormInput control={control} name="title" label="Tiêu Đề chương" placeholder="Nhập Tiêu Đề Chương" />
        <FormInput control={control} name="poster" label="Poster" placeholder="Nhập URL poster" />

        <div className="flex items-center gap-3 mt-5">
          <Button title="Trở về" buttonClassName="w-fit" onClick={() => push("/chapter")} iconStart={ArrowLeftIcon} />
          <Button title="Cập nhật" buttonClassName="bg-blue-500 text-white hover:bg-blue-500 hover:opacity-80 w-fit" onClick={handleSubmit(onSubmit)} iconStart={Pencil2Icon} />
        </div>
      </div>
    </Fragment>
  );
};

export default Update;
