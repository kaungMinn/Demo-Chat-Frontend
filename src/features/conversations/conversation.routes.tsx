import { lazy } from "react";

const paths = {
  list: "/conversations",
  create: "/conversations/create",
  details: "/conversations/details/:id",
  cover: "/conversations/cover",
};

const ConversationDetails = lazy(() => import("@/features/conversations/pages/conversation-details"));
const ConversationCover = lazy(() => import("@/features/conversations/pages/conversation-cover"));

const list = [
  {
    path: paths.details,
    element: <ConversationDetails />,
  },
  {
    path: paths.cover,
    element: <ConversationCover />,
  },
];

export const ConversationRoutes = {
  paths,
  list,
};
