import { AuthRoutes } from "@/features/auth/auth.routes";
import { ConversationRoutes } from "@/features/conversations/conversation.routes";
import { NotFoundRoutes } from "@/features/notfound/notfound.routes";

export const PUBLIC_ROUTES = NotFoundRoutes.list;

export const UNPROTECTED_ROUTES = AuthRoutes.list;

export const PROTECTED_ROUTES = [
  ...ConversationRoutes.list,
];
