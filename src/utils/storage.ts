export function getCookie(key: string): any {
  const cookieData = document.cookie.split(";");

  for (let i = 0; i < cookieData.length; i++) {
    const cookiePair = cookieData[i].split("=");

    if (key === cookiePair[0].trim())
      return cookiePair[1];
  }

  return null;
}

export function setCookie(key: string, value: string, path: string = "/"): void {
  document.cookie = `${key}=${value};path=${path}`;
}

export function clearAllCookies(path: string = "/") {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=Thu, 01 Jan 2000 00:00:00 UTC; path=${path}`);
  });
}

export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): any {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function clearAllLocalStorage() {
  window.localStorage.clear();
}
