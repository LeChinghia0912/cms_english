import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AuthSchema = object({
  email: string().required("Trường này bắt buộc nhập").email("Định dạng email không hợp lệ"),
  password: string().required("Trường này bắt buộc nhập"),
  fullname: string().required("Trường này bắt buộc nhập"),
  age: string().required("Trường này bắt buộc nhập"),
  level: string().required("Trường này bắt buộc nhập"),
  phone: string().required("Trường này bắt buộc nhập"),
});

export const Auth = yupResolver(AuthSchema);
