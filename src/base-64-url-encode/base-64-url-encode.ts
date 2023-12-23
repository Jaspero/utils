export function base64UrlEncode(value: any, stringify = true) {
    if (stringify) {
        value = JSON.stringify(value);
    }

    return btoa(value)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '.');
}