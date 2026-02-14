import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { jwtDecode } from "jwt-decode";

import { instanceForJSON, instanceForMultipart } from "@/api/instance";
import { ACCESS_TOKEN } from "@/constants/storage";
import { AuthApis } from "@/features/auth/auth.apis";
import { getCookie, setCookie } from "@/utils/storage";

type UserInformationType = {
  userId: number;
  fullName: string;
  email: string;
  deptId: number;
  roleId: number;
  iat: number;
  exp: number;
};

async function onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const accessToken = getCookie(ACCESS_TOKEN);
  config.headers!.Authorization = `Bearer ${accessToken}`;
  if (!accessToken) {
    return config;
  }

  const user: UserInformationType = jwtDecode(accessToken);
  const isExpired = user.exp * 1000 < new Date().getTime();

  if (isExpired) {
    const response = await AuthApis.actions.refreshTheToken();
    const accessToken = response?.data.details.accessToken;
    setCookie(ACCESS_TOKEN, accessToken);
    config.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
  }
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function onResponse(res: AxiosResponse): AxiosResponse {
  return res;
}

function onResponseError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

export function getApiInstanceForJSON() {
  instanceForJSON.interceptors.request.use(onRequest, onRequestError);
  instanceForJSON.interceptors.response.use(onResponse, onResponseError);

  return instanceForJSON;
}

export function getApiInstanceForMultipart() {
  instanceForMultipart.interceptors.request.use(onRequest, onRequestError);
  instanceForMultipart.interceptors.response.use(onResponse, onResponseError);

  return instanceForMultipart;
}
