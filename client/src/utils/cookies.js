export function saveAuthToCookie(value) {
  document.cookie = `godaeri_auth=${value}`;
}

export function saveUserNickToCookie(value) {
  document.cookie = `user_nick=${value}`;
}

export function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)godaeri_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

export function getUserNickFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_nick\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

export function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
