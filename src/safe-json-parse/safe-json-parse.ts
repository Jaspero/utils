export function safeJsonParse(data: string) {
    let final: any;

    try {
        final = JSON.parse(data);
    } catch (e) { }

    return final;
}
