import { array, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const QuestionSchema = object({
  label: string().required("Trường này không được để trống"),
  poster: string(),
  results: string().required("Trường này không được để trống"),
});

export const Question = yupResolver(QuestionSchema);
