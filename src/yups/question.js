import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const QuestionSchema = object({
  label: string().required("Trường này không được để trống"),
  poster: string().required("Trường này không được để trống"),
  options: string().required("Trường này không được để trống"),
  results: string().required("Trường này không được để trống"),
});

export const Question = yupResolver(QuestionSchema);
