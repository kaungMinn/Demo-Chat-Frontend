import { generalInstance } from "@/api/instance";
import { getApiInstanceForJSON } from "@/api/interceptors";

import type { LoginFormHookFormType } from "./components/forms/login-form/hookform";

const paths = {
  login: "/auth/login",
};

async function login(data: LoginFormHookFormType) {
  return await getApiInstanceForJSON().post(paths.login, data);
}

async function refreshTheToken() {
  try {
    const response = await generalInstance.get("/auth/refresh");
    return response;
  }
  catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
}

async function logout() {
  const response = await getApiInstanceForJSON().get("/auth/logout");
  return response;
}

export const AuthApis = {
  paths,
  actions: {
    login,
    refreshTheToken,
    logout,
  },
};
