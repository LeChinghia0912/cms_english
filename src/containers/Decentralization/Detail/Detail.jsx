"use client";

import { Button, HeadLine } from "@/components";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const DetailUser = ({ initData }) => {
  const user = get(initData, ["0"]);
  const { push } = useRouter();
  console.log(user)

  return (
    <Fragment>
      <HeadLine title={`Chi tiết người dùng`} />

      <div className="flex flex-col gap-3 px-3 py-4 mt-8 mb-10 bg-white rounded-md shadow-md">
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Email</span>
          <span className="font-medium">: {user?.email}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Họ và tên</span>
          <span className="font-medium">: {user?.fullname}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Tuổi</span>
          <span className="font-medium">: {user?.age}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Trình độ học vấn</span>
          <span className="font-medium">: {user?.level}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Số điện thoại</span>
          <span className="font-medium">: {user?.phone}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Quyền hiện tại</span>
          <span className="font-medium">: {user?.role}</span>
        </div>

        <Button
          title="Trở Lại"
          buttonClassName="w-fit mt-5"
          onClick={() => push("/decentralization")}
          iconStart={ArrowLeftIcon}
        />
      </div>
    </Fragment>
  );
};

export default DetailUser;
