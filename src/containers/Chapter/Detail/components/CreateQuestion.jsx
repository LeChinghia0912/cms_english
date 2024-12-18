import { get } from "lodash";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { httpRequest } from "@/utils";
import { Question } from "@/yups/question";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";

const CreateQuestion = ({ lesson }) => {
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const [mutiSelect, setMutiSelect] = useState(true);
  const [layer, setLayer] = useState(1);

  const { control, handleSubmit } = useForm({
    resolver: Question,
    defaultValues: {
      label: "",
      poster: "",
      options: [],
      results: [],
    },
  });

  const onSubmit = useCallback(
    async (value) => {
      try {
        const { label, options, results, poster } = value;

        await httpRequest({
          method: "POST",
          url: "question/created",
          headers: { Authorization: `Bearer ${access_token}` },
          data: {
            label,
            layer,
            poster,
            options: options.replaceAll(" ", "").split(","),
            results: results.replaceAll(" ", "").split(","),
            mutiSelect,
            lesson_id: lesson._id,
          },
        });

        toast.success("Tạo câu hỏi thành công");
        window.location.reload();
      } catch (error) {
        toast.error("Có lỗi xảy ra, thử lại sau");
      }
    },
    [lesson, mutiSelect, layer]
  );

  return (
    <Drawer
      labelOpen="create-question"
      heading="Tạo Mới"
      listClassName="w-[500px]"
    >
      <div className="flex flex-col gap-4 px-4">
        <FormInput
          control={control}
          name="label"
          label="Tiêu Đề Câu Hỏi"
          placeholder="Nhập Tiêu Đề Câu Hỏi"
        />

        <FormInput
          control={control}
          name="poster"
          label="Ảnh poster"
          placeholder="Nhập URL ảnh poster"
        />

        <div
          className="tooltip"
          data-tip="Là Giao diện hiển thị câu hỏi, Hãy nhập số 1 hoặc 2 hoặc 3 hoặc 4 vào ô bên dưới để chọn giao diện"
        >
          <label className="font-medium w-fit block mb-2">
            Chọn nhiều đáp án
          </label>

          <select
            name="layer"
            onChange={(e) => setLayer(e.target.value)}
            className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
          >
            <option value="1">Đọc</option>
            <option value="2">Nghe</option>
            <option value="3">Viết</option>
            <option value="4">Nói</option>
          </select>
        </div>

        <div
          className="tooltip"
          data-tip="Hãy nhập các đáp án mà người dùng có thể chọn, ngăn cách các đáp án bằng dấu phẩy."
        >
          <FormInput
            control={control}
            name="options"
            label="Đáp Án"
            placeholder="Nhập Các Đáp Án"
          />
        </div>

        <div
          className="tooltip"
          data-tip="Tương tự như phần đáp án, Ở phần kết quả chính xác này, hãy ngăn cách chúng bằng dấu phẩy."
        >
          <FormInput
            control={control}
            name="results"
            label="Kết Quả Chính Xác"
            placeholder="Nhập Các Kết Quả Chính Xác"
          />
        </div>

        <label className="font-medium w-fit block">Chọn nhiều đáp án</label>

        <select
          name="mutiSelect"
          onChange={(e) => setMutiSelect(e.target.value)}
          className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
        >
          <option value={true}>Có</option>
          <option value={false}>Không</option>
        </select>

        <Button
          title="Tạo Mới"
          buttonClassName="bg-red-500 hover:bg-red-500 text-white hover:opacity-90"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Drawer>
  );
};

export default CreateQuestion;
