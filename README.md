# alphacounter
 An alphanumeric incrementable counter with endless scale and suitable for URLs. 20 lines of code, no dependencies.

## Why?

Initially, this was created to limit the number of characters in a counter and allow the counter to go beyond the range
of JavaScript precision. However, after creating it, I found you can get to 9 quadrillion before losing precision with
JavaScript (not something I was about to reach), and if you are JSON encoding the values (like I was), numbers will
be smaller or equal in represented JSON character length below 100k because a string has 2 additional characters (the
quote marks). In the example below, 1002 is represented as F9, which is smaller until JSON encoded as "F9", making it 4
characters like 1002. So for my case I didn't end up needing this, but I thought I'd publish it in case someone else
might.

This may be valuable for auto-incrementing database string ids that could be used in URLs. And it could be useful for
extremely large numbers.

## Why another?

There are a few alphanumeric incrementing libraries available, but they are implemented poorly, don't produce
sortable strings, and are larger than they need to be. incstr, alphaplusplus, & alpha-inc all use the wrong alphabet
order so you can't check if one counter is larger than another.

## Usage

```js
import { inc } from 'alphacounter';

let counter = inc(); // 0
counter = inc(counter); // 1

for (let i = 0; i < 1000; i++) {
  counter = inc(counter); // 2, 3, ..., 8, 9, A, B, ..., y, z, 00, 01, 02, ..., F8, F9
}

// Compare two counters
console.log(inc.is(counter).gt('A')); // true
console.log(inc.is(counter).gt('00A')); // false
```
