import { isObject } from "@/utils/Util";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { reloadAsync } from "expo-updates";
import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import { Platform } from "react-native";

if (true) {
  require("axios-debug-log/enable");
}
export type ErrorResponse = {
  code: string | null;
  message: string;
  status: number;
};
type Params = {
  [key: string]: any;
};

const baseURL = process.env.API_URL;

const Api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (paramObj) => {
    const params = new URLSearchParams();
    for (const key in paramObj) {
      if (Array.isArray(paramObj[key])) {
        for (const value of paramObj[key]) {
          params.append(key, value);
        }
      } else {
        params.append(key, paramObj[key]);
      }
    }
    return params.toString();
  },
  transformResponse: (response, _headers) => {
    if (response && typeof response === "string") {
      response = JSON.parse(response);
    }
    return responseAdapter(response);
  },
});

export const responseAdapter = <T, V>(
  targetObject: T | any | object
): V | any => {
  if (Array.isArray(targetObject)) {
    return (targetObject as T[]).map((value) =>
      responseAdapter<T, V>(value)
    ) as any;
  } else if (!isObject(targetObject)) {
    return targetObject;
  }

  const transformed: any = {};
  const keys = Object.keys(targetObject);

  for (const key of keys) {
    const value = targetObject[key];
    const transformedKey = camelCase(key);

    if (Array.isArray(value)) {
      transformed[transformedKey] = value.map((v) => responseAdapter(v));
    } else if (isObject(value)) {
      transformed[transformedKey] = responseAdapter(value);
    } else {
      transformed[transformedKey] = value;
    }
  }

  return transformed as V;
};

/**
 * JSON 형식의 데이터를 camelCase -> snake_case 로 전환해주는 어댑터입니다.
 */
export const requestAdapter = <T, V>(
  targetObject: T | any | object
): V | any => {
  if (Array.isArray(targetObject)) {
    return (targetObject as T[]).map((value) =>
      requestAdapter<T, V>(value)
    ) as any;
  } else if (!isObject(targetObject)) {
    return targetObject;
  }

  const transformed: any = {};
  const keys = Object.keys(targetObject);

  for (const key of keys) {
    const value = targetObject[key];
    const transformedKey = snakeCase(key);

    if (Array.isArray(value)) {
      transformed[transformedKey] = value.map((v) => requestAdapter(v));
    } else if (isObject(value)) {
      transformed[transformedKey] = requestAdapter(value);
    } else {
      transformed[transformedKey] = value;
    }
  }

  return transformed as V;
};

const headers = async (
  isFormData: boolean = false
): Promise<AxiosRequestHeaders> => {
  const header: {
    "X-CLIENT-OS": string;
    Authorization?: string;
    "Content-Type"?: string;
  } = {
    "X-CLIENT-OS": Platform.OS,
  };
  const authTokenValue = "";
  if (authTokenValue) {
    header.Authorization = `Bearer ${authTokenValue}`;
  }
  if (isFormData) {
    header["Content-Type"] = "multipart/form-data";
  }
  return header as any;
};

const request = async <T>(config: AxiosRequestConfig<any>): Promise<T> => {
  if (config.data) {
    if (!(config.data instanceof FormData)) {
      config.data = requestAdapter(config.data);
    }
  }
  if (config.params) {
    Object.keys(config.params).forEach((key) => {
      const value = config.params[key];
      if (value === null || value === undefined) {
        delete config.params[key];
      }
    });
    config.params = requestAdapter(config.params);
  }
  try {
    const res = await Api.request({
      ...config,
      headers: await headers(config.data instanceof FormData),
    });
    if (res.status === 204) {
      return { data: undefined } as T;
    }
    return res.data as T;
  } catch (error) {
    const { response } = error as AxiosError;
    switch (response?.status) {
      case 401:
        reloadAsync();
        return { data: undefined } as T;
      case 403:
        return { data: undefined } as T;
      case 404:
        return { data: undefined } as T;
      case 0:
        return { data: undefined } as T;
    }
    console.error(
      `[${response?.status ?? 500}] ${config.url}: ${
        typeof error !== "string" ? JSON.stringify(error) : error
      }`
    );
    if (response?.data) {
      const data = response?.data as any;
      throw {
        code: data?.code,
        message: data?.message,
        status: response.status,
      } as ErrorResponse;
    }
    throw error;
  }
};

// 타 유저의 토큰을 사용하는 요청에서 post, patch, delete 허용할 예외 urls
const exceptionUrlsForOtherUserAuthTokenRequest: string[] = [];

const getApi = async <T>(
  url: string,
  params?: Params,
  extraConfig?: AxiosRequestConfig
): Promise<T> => {
  return request({
    ...extraConfig,
    method: "GET",
    url,
    params,
  });
};

const postApi = async <T>(
  url: string,
  data?: Params,
  extraConfig?: AxiosRequestConfig
): Promise<T> => {
  return request({
    ...extraConfig,
    method: "POST",
    url,
    data,
  });
};

const patchApi = async <T>(
  url: string,
  data?: Params,
  extraConfig?: AxiosRequestConfig
): Promise<T> => {
  return request({
    ...extraConfig,
    method: "PATCH",
    url,
    data,
  });
};

const deleteApi = async <T>(
  url: string,
  params?: Params,
  extraConfig?: AxiosRequestConfig
): Promise<T> => {
  return request({
    ...extraConfig,
    method: "DELETE",
    url,
    params,
  });
};

export { deleteApi, getApi, patchApi, postApi };
