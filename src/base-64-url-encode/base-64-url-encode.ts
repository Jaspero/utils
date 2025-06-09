import { Base64 } from "../base64";

export function base64UrlEncode(value: any, stringify = true) {
  if (stringify) {
    value = JSON.stringify(value);
  }

  return Base64.encode(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=/g, ".");
}
