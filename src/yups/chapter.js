import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ChapterSchema = object({
  name: string().required("Trường này không được để trống"),
  poster: string().required("Trường này không được để trống"),
});

export const Chapter = yupResolver(ChapterSchema);
