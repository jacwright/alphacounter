export declare type Counter = string | undefined | null;

/**
 * Increments a base 62 encoded string, with optional fixed-length padding.
 *
 * @param {Counter} counter - Base 62 encoded string.
 * @param {number} [pad] - Length for padding.
 * @return {string} Incremented string.
 */
export declare function inc(counter: Counter, pad?: number): string;
export declare namespace inc {
    var is: (a: Counter) => {

        /**
         * Compares two base 62 encoded strings and checks if the first is less than the second.
         *
         * @param {Counter} b - The base 62 encoded string to compare with.
         * @return {boolean} True if the first string is less than the second.
         */
        lt: (b: Counter) => boolean;

        /**
         * Compares two base 62 encoded strings and checks if the first is greater than the second.
         *
         * @param {Counter} b - The base 62 encoded string to compare with.
         * @return {boolean} True if the first string is greater than the second.
         */
        gt: (b: Counter) => boolean;

        /**
         * Checks if two base 62 encoded strings are equal.
         *
         * @param {Counter} b - The base 62 encoded string to compare with.
         * @return {boolean} True if both strings are equal.
         */
        eq: (b: Counter) => boolean;
    };

    /**
     * Converts a number, BigInt, or a hexadecimal string to a base 62 encoded string.
     * Optionally pads the result to a fixed length.
     *
     * @param {number|string} number - The number or hexadecimal string to convert.
     * @param {number} [pad] - Optional length to pad the string to.
     * @return {string} The base 62 encoded string.
     */
    var from: (number: number | string, pad?: number) => string;

    /**
     * Converts a base 62 encoded string back to a number.
     * Optionally ignores leading zeros in the input string.
     *
     * @param {Counter} counter - The base 62 encoded string to convert.
     * @return {number} The decoded number.
     */
    var to: (counter: Counter) => number;
    var toBig: (counter: Counter) => BigInt;

    /**
     * Inverts a base 62 encoded string and optionally pads the result to a fixed length.
     * Inversion means replacing each character with its complement in the base 62 charset.
     * This will allow sorting the strings in descending order.
     *
     * @param {Counter} counter - The base 62 encoded string to invert.
     * @param {number} [pad] - Optional length to pad the string to.
     * @return {string} The inverted base 62 encoded string.
     */
    var invert: (counter: Counter, pad?: number) => string;

    /**
     * Decrements a base 62 encoded string, with optional fixed-length padding.
     * This is the reverse operation of `inc`.
     *
     * @param {string} str - Base 62 encoded string.
     * @param {number} [pad] - Length for padding.
     * @return {string} Decremented string.
     */
    var dec: (counter: Counter, pad?: number) => string;
}
