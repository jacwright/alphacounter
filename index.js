const charsNext = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').split('').reduce((obj, char, i, chars) => (obj[char] = chars[i + 1] || '0') && obj, { undefined: '0' });
const len = str => str && str.length || 0;

export function inc(str, pad) {
  if (!str) return '0'.repeat(pad || 1);
  let chars = [], i = str.length - 1;
  for (; i >= -1; i--) {
    const next = charsNext[str[i]];
    chars.push(next);
    if (next !== '0') break;
  }
  str = str.slice(0, Math.max(i, 0)) + chars.reverse().join('');
  if (pad && str.length < pad) str = '0'.repeat(pad - str.length) + str;
  return str;
}

inc.is = (a) => ({
  lt: (b) => len(a) !== len(b) ? len(a) < len(b) : a < b,
  gt: (b) => len(a) !== len(b) ? len(a) > len(b) : a > b,
  eq: (b) => (!a && !b) || a === b,
})
