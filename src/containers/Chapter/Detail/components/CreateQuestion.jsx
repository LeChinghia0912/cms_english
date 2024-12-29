import { get } from "lodash";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { httpRequest } from "@/utils";
import { Button, Drawer } from "@/components";
import { FormInput } from "@/components/Forms";
import { Question } from "@/yups/question";

const CreateQuestion = ({ lesson }) => {
  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  // State quản lý đáp án
  const [options, setOptions] = useState([""]); // Mảng chứa các đáp án
  const [layer, setLayer] = useState(1);
  const [mutiSelect, setMutiSelect] = useState(true);

  const { control, handleSubmit } = useForm({
    resolver: Question,
    defaultValues: {
      label: "",
      poster: "",
      results: "",
    },
  });

  // Hàm xử lý thêm/xóa/đổi đáp án
  const handleAddOption = () => setOptions([...options, ""]);
  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  const handleOptionChange = (value, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Hàm submit
  const onSubmit = useCallback(
    async (value) => {
      try {
        const { label, results, poster } = value;

        // Kiểm tra đầu vào
        if (!label.trim()) {
          toast.error("Tiêu đề câu hỏi không được để trống.");
          return;
        }
        // if (options.some((option) => option.trim() === "")) {
        //   toast.error("Đáp án không được để trống.");
        //   return;
        // }
        if (!results.trim()) {
          toast.error("Kết quả chính xác không được để trống.");
          return;
        }

        // Gửi yêu cầu API
        await httpRequest({
          method: "POST",
          url: "question/created",
          headers: { Authorization: `Bearer ${access_token}` },
          data: {
            label,
            layer,
            poster,
            options: options, // Loại bỏ đáp án trống
            results: results.replaceAll(" ", "").split(","), // Chuyển chuỗi kết quả thành mảng
            mutiSelect,
            lesson_id: lesson._id,
          },
        });

        toast.success("Tạo câu hỏi thành công");
        window.location.reload();
      } catch (error) {
        console.error("Error creating question:", error);
        toast.error("Có lỗi xảy ra, thử lại sau");
      }
    },
    [lesson, options, layer, mutiSelect]
  );

  return (
    <Drawer
      labelOpen="create-question"
      heading="Tạo Mới"
      listClassName="w-[500px]"
    >
      <div className="flex flex-col gap-4 px-4">
        {/* Tiêu đề câu hỏi */}
        <FormInput
          control={control}
          name="label"
          label="Tiêu Đề Câu Hỏi"
          placeholder="Nhập Tiêu Đề Câu Hỏi"
        />

        {/* Poster */}
        <FormInput
          control={control}
          name="poster"
          label="Ảnh poster"
          placeholder="Nhập URL ảnh poster"
        />

        {/* Kĩ năng */}
        <div>
          <label className="font-medium block mb-2">Kĩ năng câu hỏi</label>
          <select
            value={layer}
            onChange={(e) => setLayer(Number(e.target.value))}
            className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
          >
            <option value={1}>Đọc</option>
            <option value={2}>Viết</option>
            <option value={3}>Nghe</option>
            <option value={4}>Nói</option>
          </select>
        </div>

        {/* Đáp án */}
        <div>
          <label className="font-medium block mb-2">Đáp Án</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
                className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
                placeholder={`Đáp án ${index + 1}`}
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-blue-500 hover:underline"
          >
            + Thêm đáp án
          </button>
        </div>

        {/* Kết quả chính xác */}
        <FormInput
          control={control}
          name="results"
          label="Kết Quả Chính Xác"
          placeholder="Nhập Các Kết Quả Chính Xác (cách nhau bằng dấu phẩy)"
        />

        {/* Chọn nhiều đáp án */}
        <div>
          <label className="font-medium block mb-2">Chọn nhiều đáp án</label>
          <select
            value={mutiSelect}
            onChange={(e) => setMutiSelect(e.target.value === "true")}
            className="bg-transparent rounded-md input focus:outline-none w-full border !border-[#cccccc] p-3"
          >
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
        </div>

        {/* Nút tạo mới */}
        <Button
          title="Tạo Mới"
          buttonClassName="bg-red-500 hover:bg-red-600 text-white hover:opacity-90"
          onClick={handleSubmit(onSubmit, (error) => {
            console.log(error)
            toast.error("Bạn cần nhập đầy đủ thông tin");
          })}
        />
      </div>
    </Drawer>
  );
};

export default CreateQuestion;
