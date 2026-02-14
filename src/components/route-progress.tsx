import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingBar } from "react-top-loading-bar";

export function RouteProgress() {
  const { start, complete } = useLoadingBar();

  // This returns the number of queries currently fetching data
  const isFetching = useIsFetching();
  const location = useLocation();

  useEffect(() => {
    if (isFetching > 0) {
      start();
    }
    else {
      complete();
    }
  }, [isFetching, start, complete]);

  // 2. Handle Route Changes
  useEffect(() => {
    start();

    // We "complete" almost immediately because client-side
    // transitions are usually instant unless you have loaders.
    const timeout = setTimeout(() => {
      complete();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname, start, complete]);

  return null;
}
