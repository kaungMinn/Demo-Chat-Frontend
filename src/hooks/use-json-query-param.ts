import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to manage a JSON object in the URL search params.
 * This hook is 100% compatible with React Router 6 and 7 as it relies ONLY
 * on the official 'useSearchParams' hook and standard JavaScript JSON methods.
 * @param {string} key The key under which the JSON string is stored in the URL.
 * @param {object} defaultValue The default object value to use if the key is missing.
 * @returns {[object, function(object): void]} [currentJsonValue, setJsonValue]
 */

// keys
const qnaListFilter = "qna-list-filter";

export const routerParamKeys = { qnaListFilter };

export function useJsonQueryParam<TValues extends Record<string, any>>(key: string, defaultValue: TValues) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Deserialization: Read from URL and parse
  const value = useMemo(() => {
    const jsonString = searchParams.get(key);
    if (!jsonString) {
      return defaultValue;
    }
    try {
      // Attempt to parse the URL string back into a JS object
      return JSON.parse(jsonString);
    }
    catch (e) {
      console.error(`Failed to parse JSON query param for key "${key}":`, e);
      return defaultValue;
    }
  }, [searchParams, key, defaultValue]);

  // 2. Serialization: Update URL with new object
  const setValue = useCallback((newValue: any) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Serialize the new object value into a string
    const newJsonString = JSON.stringify(newValue);

    // Update the search param and the URL
    newSearchParams.set(key, newJsonString);
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams, key]);

  return [value, setValue];
}
