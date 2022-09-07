const chars = ('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz').split('');
const charsNext = chars.reduce((obj, char, i, chars) => (obj[char] = chars[i + 1] || '0') && obj, { undefined: '0' });
const charsIndex = chars.reduce((obj, char, i) => (obj[char] = i) && obj || obj, {});
const len = str => str && str.length || 0;

export function inc(str, pad) {
  if (!str) return '0'.repeat(pad || 1);
  let c = [], i = str.length - 1;
  for (; i >= -1; i--) {
    const next = charsNext[str[i]];
    c.push(next);
    if (next !== '0') break;
  }
  str = str.slice(0, Math.max(i, 0)) + c.reverse().join('');
  if (pad && str.length < pad) str = '0'.repeat(pad - str.length) + str;
  return str;
}

inc.is = (a) => ({
  lt: (b) => len(a) !== len(b) ? len(a) < len(b) : a < b,
  gt: (b) => len(a) !== len(b) ? len(a) > len(b) : a > b,
  eq: (b) => (!a && !b) || a === b,
})

inc.from = (n, pad) => {
  let c = [], zero = pad ? 0 : -1, sub = pad ? 0 : 1;
  while (n > zero) {
    let mod = n % 62;
    c.push(chars[mod]);
    n = (n - mod) / 62 - sub;
  }
  let str = c.reverse().join('');
  if (pad && str.length < pad) str = '0'.repeat(pad - str.length) + str;
  return str;
}

inc.to = (str, pad) => {
  if (pad) str = str.replace(/^0+/, '');
  let n = pad && str ? 1 : 0, sub = pad ? 1 : 0;
  for (let i = str.length - 1, order = 0; i >= 0; i--, order++) {
    let mod = charsIndex[str[i]];
    n += Math.pow(62, order) * (mod - sub + (order ? 1 : 0));
  }
  return n;
}
