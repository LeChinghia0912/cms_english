"use client";

import Link from "next/link";
import { get } from "lodash";
import { useCallback } from "react";
import { toast } from "react-toastify"
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
;
import { httpRequest } from "@/utils";

const Actions = ({ id, path }) => {
  const pathname = usePathname();
  const { data: auth } = useSession();

  const access_token = get(auth, ["tokens", "access_token"]);

  const handleDelete = useCallback(async() => {
    const confirm = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này");

    if(confirm) {
      try {
        await httpRequest({
          method: "DELETE",
          url: path,
          headers: { Authorization: `Bearer ${access_token}` },
          data: { id }
        });

        toast.success("Xóa thành công");
        window.location.reload();
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình xóa");        
      }
    }
  }, [id, access_token])

  return (
    <div className="flex items-center">
      <Link href={`${pathname}/view/${id}`} className="text-blue-400 underline hover:text-blue-700 transition-base">
        Xem
      </Link>
      
      <div className="mx-1 divider divider-horizontal" />

      <Link href={`${pathname}/update/${id}`} className="text-blue-400 underline hover:text-blue-700 transition-base">
        Sửa
      </Link>

      <div className="mx-1 divider divider-horizontal" />

      <button href="#" className="text-blue-400 underline hover:text-blue-700 transition-base" onClick={handleDelete}>
        Xóa
      </button>
    </div>
  );
};

export default Actions;
