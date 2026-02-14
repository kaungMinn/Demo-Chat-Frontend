import { USER } from "@/constants/storage";
import { AuthConstants } from "@/features/auth/auth.constants";
import { getLocalStorage } from "@/utils/storage";

export function useUser() {
  const user = getLocalStorage(USER) || { name: "", email: "", roles: [] };

  const isAdmin = user.roles?.includes(AuthConstants.ADMIN);
  return {
    user,
    isAdmin,
  };
}
