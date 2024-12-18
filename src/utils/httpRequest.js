import axios from "axios";
import { domainApi } from "@/utils";
import { useSession } from "next-auth/react";

const httpRequest = axios.create({
  // baseURL: NEXT_PUBLIC_BACKEND_URL,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

httpRequest.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default httpRequest;
