import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ChapterSchema = object({
  name: string().required("Trường này không được để trống").matches(/^chương \d+$/, "Tên chương phải theo định dạng chương 1, với số là dynamic"),
  title: string().required("Trường này không được để trống"),
  poster: string().required("Trường này không được để trống"),
});

export const Chapter = yupResolver(ChapterSchema);
