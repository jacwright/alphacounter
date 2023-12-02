const chars = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').split('');
const charsIndex = chars.reduce((obj, char, i) => (obj[char] = i) && obj || obj, {});
const reverseChars = chars.slice().reverse();
const trim = (s) => (s || '').replace(/^0+(\d)/, '$1');

/**
 * Increments a base 62 encoded string, with optional fixed-length padding.
 *
 * @param {string} str - Base 62 encoded string.
 * @param {number} [pad] - Length for padding.
 * @return {string} Incremented string.
 */
export function inc(str, pad) {
  if (!str) return ''.padStart(pad || 1, '0');
  let res = '', i = str.length - 1;
  for (; i >= -1; i--) {
    const next = str[i] === 'z' ? '0' : i === -1 ? '1' :  chars[charsIndex[str[i]] + 1];
    res = next + res;
    if (next !== '0') break;
  }
  str = str.slice(0, Math.max(i, 0)) + res;
  return str.padStart(pad || 1, '0');
}

inc.is = (a) => ({
  /**
   * Compares two base 62 encoded strings and checks if the first is less than the second.
   *
   * @param {string} b - The base 62 encoded string to compare with.
   * @return {boolean} True if the first string is less than the second.
   */
  lt: (b) => (a = trim(a), b = trim(b), a.length !== b.length ? a.length < b.length : a < b),

  /**
   * Compares two base 62 encoded strings and checks if the first is greater than the second.
   *
   * @param {string} b - The base 62 encoded string to compare with.
   * @return {boolean} True if the first string is greater than the second.
   */
  gt: (b) => (a = trim(a), b = trim(b), a.length !== b.length ? a.length > b.length : a > b),

  /**
   * Checks if two base 62 encoded strings are equal.
   *
   * @param {string} b - The base 62 encoded string to compare with.
   * @return {boolean} True if both strings are equal.
   */
  eq: (b) => trim(a) === trim(b),
})

/**
 * Converts a number, BigInt, or a hexadecimal string to a base 62 encoded string.
 * Optionally pads the result to a fixed length.
 *
 * @param {number|string} n - The number or hexadecimal string to convert.
 * @param {number} [pad] - Optional length to pad the string to.
 * @return {string} The base 62 encoded string.
 */
inc.from = (n, pad) => {
  let num = typeof n === 'string' && /^[0-9a-fA-F]+$/i.test(n) ? BigInt('0x' + n) : BigInt(n);
  if (num === BigInt(0)) return '0'.padStart(pad || 1, '0');
  let res = '';
  while (num > 0) {
    res = chars[num % BigInt(62)] + res;
    num /= BigInt(62);
  }
  return res.padStart(pad || res.length, '0');
};

/**
 * Converts a base 62 encoded string back to a number.
 * Optionally ignores leading zeros in the input string.
 *
 * @param {string} str - The base 62 encoded string to convert.
 * @param {boolean} [pad] - Whether to ignore leading zeros.
 * @return {number} The decoded number.
 */
inc.to = (str) => str.split('').reduce((acc, char, i) => acc * 62 + charsIndex[char], 0);

/**
 * Inverts a base 62 encoded string and optionally pads the result to a fixed length.
 * Inversion means replacing each character with its complement in the base 62 charset.
 * This will allow sorting the strings in descending order.
 *
 * @param {string} str - The base 62 encoded string to invert.
 * @param {number} [pad] - Optional length to pad the string to.
 * @return {string} The inverted base 62 encoded string.
 */
inc.invert = (str, pad) => str.padStart(pad || 1, '0').replace(/./g, char => reverseChars[charsIndex[char]]);
