import axios, { AxiosError } from "axios";

//@ts-ignore
console.log("url : ", BACKEND_URL);

export type CustomErrorResponse = {
  status: number;
  message: string;
};

export type CustomSuccessResponse = {
  status: number;
  message: string;
  data: any[];
};

const basePath = axios.create({
  /* @ts-ignore */
  baseURL: BACKEND_URL,
  timeout: 5000,
});

basePath.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;

  return config;
});

basePath.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("authToken");
      }
      throw error.response.data;
    }
  }
);

export type ErrorFindSoed = {
  success: boolean;
  message: string;
  data: Array<any>;
};

export default basePath;
