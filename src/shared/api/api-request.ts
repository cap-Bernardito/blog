import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { configEnv } from "shared/config/config-env";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const axiosInstance = axios.create({
  baseURL: configEnv.API_BASEURL,
  withCredentials: true,
});

// TODO: приделать нормальную авторизацию
const getConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const autorizationHeader = localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";

  if (typeof config === "undefined") {
    return {
      headers: {
        Authorization: autorizationHeader,
      },
    };
  }

  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: autorizationHeader,
    },
  };
};

export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.get<T, AxiosResponse<T>>(url, getConfig(config));

    return result.data;
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.post<T, AxiosResponse<T>, D>(url, data, getConfig(config));

    return result.data;
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.put<T, AxiosResponse<T>, D>(url, data, getConfig(config));

    return result.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, getConfig(config));

    return result.data;
  },
};
