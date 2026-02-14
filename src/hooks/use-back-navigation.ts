import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function useBackNavigation(paramKey: string) {
  const location = useLocation();

  const filterParams = useMemo(() => {
    // 1. Get the string from history state
    // This is the "?qna-list-filter=%7B..." you sent
    const searchString = location.state;

    if (!searchString)
      return {};

    try {
      // 2. Use URLSearchParams to parse the string
      const params = new URLSearchParams(searchString);

      // 3. Get the value by its key
      const jsonBlob = params.get(paramKey);

      // 4. Turn JSON string back into an Object
      return jsonBlob ? JSON.parse(jsonBlob) : {};
    }
    catch (error) {
      console.error("Error parsing filter data:", error);
      return {};
    }
  }, [location.state]);

  const handleHasFilterParams = () => {
    let hasFilterParams = false;
    const values = Object.values(filterParams);

    for (const filter of values) {
      if ((!Array.isArray(filter) && filter) || (Array.isArray(filter) && filter.length > 0) || (typeof filter === "boolean")) {
        hasFilterParams = true;
        break;
      }
    }

    return hasFilterParams;
  };

  return [handleHasFilterParams(), location?.state || ""];
}

export default useBackNavigation;
