export function base64UrlDecode<T = any>(value: string, parse = true) {
    
    // @ts-ignore
    value = atob(
        value
            .replace(/\-/g, '+')
            .replace(/\_/g, '/')
            .replace(/\./g, '=')
    );

    if (parse) {
        value = JSON.parse(value);
    }

    return value as unknown as T;
}