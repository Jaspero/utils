import { Base64 } from "../base64";

export function base64UrlDecode<T = any>(value: string, parse = true) {
  value = Base64.decode(
    value.replace(/\-/g, "+").replace(/\_/g, "/").replace(/\./g, "=")
  );

  if (parse) {
    value = JSON.parse(value);
  }

  return value as unknown as T;
}
