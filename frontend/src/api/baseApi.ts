import axios, { AxiosError } from "axios";

export type CustomErrorResponse = {
  message: string;
  errors?: Record<string, string>;
};

export type CustomSuccessResponse<T = any> = {
  message: string;
  data?: T;
};

const basePath = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
  timeout: 10000,
});

basePath.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  return config;
});

basePath.interceptors.response.use(
  (response) => response,
  (error: AxiosError<CustomErrorResponse>) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("authToken");
      }
      throw error.response.data;
    }
    throw { message: "Network error" };
  }
);

export default basePath;
