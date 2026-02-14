import { lazy } from "react";

const paths = {
  login: "/",
};

const Login = lazy(() => import("@/features/auth/pages/login"));

const list = [
  {
    path: paths.login,
    element: <Login />,
  },
];

export const AuthRoutes = {
  paths,
  list,
};
