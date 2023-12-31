import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { configEnv } from "../config/config-env";
import { SyncStorage } from "../lib/sync-storage";

export class HTTPClientError extends Error {
  constructor(
    public errorMessage: string,
    public code: number,
    public type: string,
    public name = "HTTPClientError",
  ) {
    super(errorMessage || type);
  }
}

const normalizeError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return new Error("Что-то пошло не так");
  }

  if (error.response) {
    return new HTTPClientError(error.response.data.message, error.response.status, error.response.statusText);
  } else if (error.request) {
    return new Error("Превышено время ожидания ответа сервера");
  } else {
    return error;
  }
};

const axiosInstance = axios.create({
  baseURL: configEnv.API_BASEURL,
  withCredentials: true,
});

const tokensStorage = new SyncStorage().create("memory", "tokens");

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = tokensStorage.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(normalizeError(error));
  },
);

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
