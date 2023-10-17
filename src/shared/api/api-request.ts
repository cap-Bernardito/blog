import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { configEnv } from "shared/config/config-env";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

export class HTTPClientError extends Error {
  constructor(
    public message: string,
    public code: number,
    public type = "HTTPClientError",
  ) {
    super(message);
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(normalizeError(error));
  },
);

const storage = new SyncStorage().create("local");

// TODO: приделать нормальную авторизацию
const getConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const autorizationHeader = storage.get(USER_LOCALSTORAGE_KEY) && "atata";

  if (typeof autorizationHeader !== "string") {
    return {};
  }

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
