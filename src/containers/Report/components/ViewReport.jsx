"use client";

import { get } from "lodash";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import { httpRequest } from "@/utils";
import { Button, Modal } from "@/components";

const ViewReport = ({ report }) => {
  const { data: auth } = useSession();
  const accessToken = get(auth, ["tokens", "access_token"]);

  const handleDeleteReport = useCallback(async () => {
    try {
      await httpRequest({
        method: "DELETE",
        url: "/report/deleted",
        data: {
          id: report._id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Đã đánh dấu report đã sửa, và xóa report");
      window.location.reload();
    } catch (error) {
      console.log("🚀 ~ handleDeleteReport ~ error:", error);
      toast.error("Có lỗi xẩy ra, vui lòng thử lại sau.");
    }
  }, [report]);

  return (
    <Modal labelOpen="view-report" heading="Chi tiết Report">
      <div className="flex flex-col gap-1">
        <div>
          <span className="mr-1 font-bold">Nội dung:</span>
          <span>{report.content}</span>
        </div>
        <div>
          <span className="mr-1 font-bold">ID câu hỏi:</span>
          <span>{report.question_id}</span>
        </div>
        <div>
          <span className="mr-1 font-bold">ID người report:</span>
          <span>{report.user_id}</span>
        </div>

        <Button
          title="Đã xử lý"
          buttonClassName="mt-5 bg-green-500 hover:bg-green-500 text-white"
          onClick={handleDeleteReport}
        />
      </div>
    </Modal>
  );
};

export default ViewReport;
