import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ACCESS_TOKEN, USER } from "@/constants/storage";
import { getCookie, setCookie, setLocalStorage } from "@/utils/storage";

import { AuthApis } from "./auth.apis";

function hasCookies() {
  const access_token = getCookie(ACCESS_TOKEN);
  // const refresh_token = getCookie(REFRESH_TOKEN);

  if (access_token) {
    return true;
  }
  return false;
}

function loginMutation() {
  return useMutation({
    mutationFn: AuthApis.actions.login,
    onSuccess: (response) => {
      const { details, success } = response?.data;

      if (!success || !details) {
        toast.error("Login failed");
        return;
      }

      // Store the access token
      if (details.accessToken) {
        toast.success("Login successful");
        setCookie(ACCESS_TOKEN, details.accessToken);
        setLocalStorage(USER, details.user);
      }
    },
  });
}

export const useAuth = {
  loginMutation,
  hasCookies,
};
