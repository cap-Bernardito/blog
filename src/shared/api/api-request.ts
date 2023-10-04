import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { configEnv } from "shared/config/config-env";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const axiosInstance = axios.create({
  baseURL: configEnv.API_BASEURL,
  withCredentials: true,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
});

export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.get<T, AxiosResponse<T>>(url, config);

    return result.data;
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);

    return result.data;
  },
};
