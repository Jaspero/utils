
/**
 * @example
 * parseTemplate('Hello {{name}}!', {name: 'John'})
 * parseTemplate('My city {{address.city}}', {address: {city: 'London'}})
 */
 export function parseTemplate(
    value = '',
    obj: any = {},

    /**
     * Provide a custom method for accessing the value from the
     * provided object
     */
    accessor?: (key: string, entry: any) => any,
    returnOriginal?: boolean
) {

    if (!accessor) {
        accessor = (key, entry) => key
            .split('.')
            .reduce((acc, cur) =>
                acc[cur],
                entry
            );
    }

    if (!value.includes('{{')) {
        return returnOriginal ? value : accessor(value, obj);
    } else {

        const lookUp = new RegExp(`{{(.*?)}}`);

        while (lookUp.test(value)) {
            value = value.replace(
                lookUp,
                accessor(RegExp.$1, obj)
            );
        }

        return value;
    }
}
