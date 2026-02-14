function queryMaker<T>(obj: T): string {
  let result: string = "";
  if (obj) {
    Object.entries(obj).forEach(([key, value], index) => {
      index === 0
        ? (result += `?${value ? Array.isArray(value) ? value.length > 0 ? `${key}=${value}` : "" : `${key}=${value}` : ""}`)
        : (result += `${value ? Array.isArray(value) ? value.length > 0 ? `&${key}=${value}` : "" : `&${key}=${value}` : ""}`);
    });
  }
  return result;
}

export const ApiUtils = { queryMaker };
