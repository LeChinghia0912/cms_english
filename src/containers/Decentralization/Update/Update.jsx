"use client";

import { get } from "lodash";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { ArrowLeftIcon, Pencil2Icon } from "@radix-ui/react-icons";

import { Auth } from "@/yups/auth";
import { httpRequest } from "@/utils";
import { FormInput } from "@/components/Forms";
import { Button, HeadLine } from "@/components";

const UpdateUser = ({ initData }) => {
  
  const { push } = useRouter();
  const data = get(initData, ["0"]);
  const [role, setRole] = useState(data?.role);

  console.log(data?.role)

  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const { control, handleSubmit } = useForm({
    resolver: Auth,
    defaultValues: {
      email: data?.email || "",
      fullname: data?.fullname || "",
      password: data?.password || "",
      age: data?.age || "",
      level: data?.level || "",
      phone: data?.phone || "",
    },
  });

  const onSubmit = useCallback(
    async (value) => {
      try {
        await httpRequest({
          method: "PATCH",
          url: "auth/change-info",
          data: {
            ...value,
            role,
            id: data?._id
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        toast.success("Chỉnh sửa thành công");
        window.location.reload();
      } catch (error) {

        const errorMessage = get(
          error,
          "response.data.message",
          "Có lỗi xảy ra, vui lòng thử lại sau"
        );
        toast.error(errorMessage);
      }
    },
    [access_token, role]
  );

  return (
    <Fragment>
      <HeadLine title="Cập nhật người dùng" />

      <div className="flex flex-col gap-5 px-3 py-4 mt-8 mb-10 bg-white rounded-md shadow-md">
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Nhập email"
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
          label="Trình độ học vấn"
          placeholder="Nhập trình độ học vấn"
        />
        <FormInput
          control={control}
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
        />
        <FormInput
          control={control}
          name="fullname"
          label="Họ và tên"
          placeholder="Nhập họ và tên"
        />

        <div>
          <label className="font-medium w-fit mb-2 block">Phân quyền</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
          >
            <option value="user">Người dùng</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Button
            title="Trở về"
            buttonClassName="w-fit"
            onClick={() => push("/decentralization")}
            iconStart={ArrowLeftIcon}
          />
          <Button
            title="Cập nhật"
            buttonClassName="bg-blue-500 text-white hover:bg-blue-500 hover:opacity-80 w-fit"
            onClick={handleSubmit(onSubmit, () => { toast.error("Nhập đầy đủ thông tin")})}
            iconStart={Pencil2Icon}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
