/**
 * Lowercase the first char of a string
 */
export function pascalCaseToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}


/**
 * Convert dash case to camel case
 */
export function dashCaseToCamelCase(string) {
    return string.replace( /-([a-z])/ig, function(all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * Convert dash case to camel case
 */
export function dashCaseToDotCase(string) {
    return string.replace( /-([a-z])/ig, function(all, letter) {
        return `.${letter}`;
    });
}