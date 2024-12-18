import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LessonSchema = object({
  name: string().required("Trường này không được để trống").matches(/^bài \d+$/, "Tên bài học phải theo định dạng bài 1, với số là dynamic"),
  title: string().required("Trường này không được để trống"),
  poster: string().required("Trường này không được để trống"),
});

export const Lesson = yupResolver(LessonSchema);
