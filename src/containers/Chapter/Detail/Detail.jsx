"use client";

import { get } from "lodash";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

import { httpRequest } from "@/utils";
import { Button, HeadLine } from "@/components";
import CreateLesson from "./components/CreateLesson";
import CreateQuestion from "./components/CreateQuestion";
import UpdateLesson from "./components/UpdateLesson";

const Chapter = ({ initData }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const chapter = get(initData, ["0"]);
  const lessons = get(initData, ["1", "items"]);
  const questions = get(initData, ["2", "data", "items"]);

  const { data: auth } = useSession();
  const access_token = get(auth, ["tokens", "access_token"]);

  const [lesson, setLesson] = useState(null);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if(lesson?.slug) {
      push(pathname + `?lesson_slug=${lesson?.slug}`);
    }
  }, [lesson])

  const handleShowLesson = useCallback((data) => {
    setLesson(data);
  }, [lesson]);

  const handleDeleteLesson = useCallback(async() => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa bài học này");

    if(confirm) {
      try {
        await httpRequest({
          method: "DELETE",
          data: { id: lesson._id},
          url: "lesson/deleted",
          headers: { Authorization: `Bearer ${access_token}`},
        });

        toast.success("Xóa bài học thành công");
        window.location.reload();
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình xóa");
      }
    }
  }, [lesson, access_token])

  const handleDeleteQuestion = useCallback(async() => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa bài học này");

    if(confirm) {
      try {
        await httpRequest({
          method: "DELETE",
          data: { id: question._id},
          url: "question/deleted",
          headers: { Authorization: `Bearer ${access_token}`},
        });

        toast.success("Xóa bài học thành công");
        window.location.reload();
      } catch (error) {
        toast.error("Có lỗi xảy ra trong quá trình xóa");
      }
    }
  }, [question, access_token])

  const renderLessons = useMemo(() => {
    if (typeof lessons == "undefined") return null;
    if (lessons && lessons.length === 0)
      return (
        <span className="col-span-8 font-medium max-lg:col-span-5">
          Không có bài học nào cho chương này.
        </span>
      );

    return lessons.map((el, idx) => (
      <button
        key={idx}
        onClick={() => handleShowLesson(el)}
        className="flex items-center gap-3 py-3 rounded-sm border-[1px] border-stone-500 shadow-lg flex-center cursor-pointer hover:shadow-2xl transition-base focus:bg-primary focus:text-white"
      >
        <span className="font-medium">{el.name}</span>
      </button>
    ));
  }, [lessons]);

  const renderQuestions = useMemo(() => {
    if(typeof questions == "undefined") return <span className="col-span-8 font-medium max-lg:col-span-5">Không có câu hỏi cho bài này.</span>;

    return questions.map((el, idx) => (
      <button
        key={idx}
        onClick={() => setQuestion(el)}
        className="flex items-center gap-3 py-3 rounded-sm border-[1px] border-stone-500 shadow-lg flex-center cursor-pointer hover:shadow-2xl transition-base focus:bg-primary focus:text-white"
      >
        <span className="font-medium">Câu {idx + 1}</span>
      </button>
    ));
  }, [questions, lesson])

  return (
    <Fragment>
      <HeadLine title={`Chi tiết ${chapter?.name}`} />

      <div className="flex flex-col gap-3 px-3 py-4 mt-8 mb-10 bg-white rounded-md shadow-md">
        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Tên Chương</span>
          <span className="font-medium">: {chapter?.name}</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Tiêu Đề Chương</span>
          <span className="font-medium">: {chapter?.title}</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">Slug</span>
          <span className="font-medium">: {chapter?.slug}</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-bold min-w-[150px]">ID</span>
          <span className="font-medium">: {chapter?._id}</span>
        </div>

        <HeadLine title="Danh sách bài học" containerClassName="mt-5" />

        <div className="grid grid-cols-8 gap-5 mt-3 max-lg:grid-cols-5">
          {renderLessons}

          <label
            htmlFor="create-lesson"
            className="flex items-center gap-3 py-3 rounded-sm border-[1px] border-stone-500 shadow-lg flex-center cursor-pointer hover:shadow-2xl transition-base"
          >
            <PlusCircledIcon className="w-5 h-5" />
          </label>
        </div>

        {lesson && (
          <Fragment>
            <div className="flex flex-col">
              <div><span className="font-bold">Tên bài học:</span> {lesson.name}</div>
              <div><span className="font-bold">Tiều đều bài học:</span> {lesson.title}</div>
              <div><span className="font-bold">Slug:</span> {lesson.slug}</div>
              <div><span className="font-bold">ID:</span> {lesson._id}</div>

              <Button title="Chỉnh Sửa Bài Học" iconStart={Pencil2Icon} buttonClassName="w-fit bg-blue-500 text-white hover:bg-blue-500 mt-2" component="label" htmlFor="update-lesson" />
              <Button title="Xóa Bài Học" iconStart={TrashIcon} buttonClassName="w-fit bg-red-500 text-white hover:bg-red-500 mt-2" onClick={handleDeleteLesson} />
            </div>

            <HeadLine title="Danh sách Câu Hỏi" containerClassName="mt-2" />

            <div className="grid grid-cols-8 gap-5">
              {renderQuestions}

              <label
                htmlFor="create-question"
                className="flex items-center gap-3 py-3 rounded-sm border-[1px] border-stone-500 shadow-lg flex-center cursor-pointer hover:shadow-2xl transition-base"
              >
                <PlusCircledIcon className="w-5 h-5" />
              </label>
            </div>

            {question && (
              <div className="flex flex-col">
                <div><span className="font-bold">Nội dung câu hỏi:</span> {question?.label}</div>
                <div><span className="font-bold">Được phép Chọn nhiều:</span> {question?.mutiSelect ? "Có" : "Không"}</div>
                <div><span className="font-bold">Layer:</span> {question?.layer}</div>
                <div><span className="font-bold">Các câu trả lời:</span> {question?.child?.join(", ")}</div>
                <div><span className="font-bold">Đáp án chính xác:</span> {question?.results?.join(", ")}</div>

                <Button title="Xóa Câu Hỏi" iconStart={TrashIcon} buttonClassName="w-fit bg-red-500 text-white hover:bg-red-500 mt-2" onClick={handleDeleteQuestion} />
              </div>
            )}
          </Fragment>
        )}

        <Button
          title="Trở Lại"
          buttonClassName="w-fit mt-5"
          onClick={() => push("/chapter")}
          iconStart={ArrowLeftIcon}
        />
      </div>

      <CreateLesson />
      
      {lesson && <CreateQuestion lesson={lesson} />}
      {lesson && <UpdateLesson key={lesson._id} lesson={lesson} chapter={chapter} />}
    </Fragment>
  );
};

export default Chapter;
