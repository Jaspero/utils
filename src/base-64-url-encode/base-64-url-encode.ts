export function base64UrlEncode(value: any, stringify = true) {
    if (stringify) {
        value = JSON.stringify(value);
    }

    // @ts-ignore
    return btoa(value)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '.');
}