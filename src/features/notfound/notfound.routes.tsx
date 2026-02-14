import { lazy } from "react";

const paths = {
  notfound: "*",
};

const NotFound = lazy(() => import("./index"));

export const NotFoundRoutes = {
  paths,
  list: [
    {
      path: paths.notfound,
      element: <NotFound />,
    },
  ],
};
