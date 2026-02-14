import { useIsFetching } from "@tanstack/react-query";

type UseCustomQueriesType = {
  isFetching: boolean;
};

function useCustomQueries(): UseCustomQueriesType {
  const isFetching = useIsFetching() > 0;
  return { isFetching };
}

export default useCustomQueries;
