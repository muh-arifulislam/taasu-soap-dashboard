import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function normalizeToEmptyString<T extends object>(
  obj: T
): { [K in keyof T]: string } {
  const result = {} as { [K in keyof T]: string };
  for (const key in obj) {
    const value = obj[key];
    result[key] = value == null ? "" : String(value);
  }
  return result;
}

export function isShallowEqual<T extends object>(a: T, b: T): boolean {
  const keysA = Object.keys(a) as (keyof T)[]
  const keysB = Object.keys(b) as (keyof T)[]

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (a[key] !== b[key]) return false
  }

  return true
}
