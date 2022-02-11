import { capitalize } from '../capitalize/capitalize';

/**
 * Transforms a key from camelCase, snake_case or dash-case
 * in to label format
 * 
 * @example
 * toLabel('someLabel') 
 * 
 * # Result
 * 'Some Label'
 */
export function toLabel(key: string) {
    return key
        .split(/(?=[A-Z\_\-])/)
        .map(word =>
            capitalize(word.replace(/\_\-/g, ''))        
        )
        .join(' ')
}